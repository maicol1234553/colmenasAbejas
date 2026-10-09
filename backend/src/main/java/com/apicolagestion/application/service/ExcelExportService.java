package com.apicolagestion.application.service;

import com.apicolagestion.domain.entities.ChequeoGeneral;
import com.apicolagestion.domain.entities.RegistroCosecha;
import com.apicolagestion.infrastructure.repositories.ChequeoGeneralRepository;
import com.apicolagestion.infrastructure.repositories.RegistroCosechaRepository;
import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ExcelExportService {

    private final ChequeoGeneralRepository chequeoRepository;
    private final RegistroCosechaRepository cosechaRepository;

    public byte[] generarReporteExcel() throws IOException {
        try (XSSFWorkbook workbook = new XSSFWorkbook()) {
            crearHojaChequeos(workbook);
            crearHojaCosechas(workbook);
            crearHojaResumen(workbook);

            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            workbook.write(outputStream);
            return outputStream.toByteArray();
        }
    }

    private void crearHojaChequeos(XSSFWorkbook workbook) {
        Sheet sheet = workbook.createSheet("Chequeos Generales");
        List<ChequeoGeneral> chequeos = chequeoRepository.findAllByOrderByFechaDesc();

        // Estilos
        CellStyle headerStyle = crearEstiloHeader(workbook);
        CellStyle dataStyle = crearEstiloData(workbook);

        // Encabezados
        String[] headers = {
            "ID", "Colmena", "Fecha", "Alza", "Cuadro", "Temperamento",
            "Población", "Miel", "Pan de Abeja", "Cría Operculada",
            "Cría Abierta", "% Cuadro", "Reinas", "Reserva Alimento",
            "Alimentación Artificial", "Comportamiento Higiénico",
            "Estado Sanitario", "Observaciones"
        };

        Row headerRow = sheet.createRow(0);
        for (int i = 0; i < headers.length; i++) {
            Cell cell = headerRow.createCell(i);
            cell.setCellValue(headers[i]);
            cell.setCellStyle(headerStyle);
        }

        // Datos
        int rowNum = 1;
        for (ChequeoGeneral c : chequeos) {
            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(c.getId());
            row.createCell(1).setCellValue(c.getColmenaId());
            row.createCell(2).setCellValue(c.getFecha().toString());
            row.createCell(3).setCellValue(c.getAlza());
            row.createCell(4).setCellValue(c.getCuadro());
            row.createCell(5).setCellValue(c.getTemperamento());
            row.createCell(6).setCellValue(c.getPoblacion());
            row.createCell(7).setCellValue(c.getPresenciaMiel());
            row.createCell(8).setCellValue(c.getPresenciaPanAbeja());
            row.createCell(9).setCellValue(c.getPresenciaCriaOperculada());
            row.createCell(10).setCellValue(c.getPresenciaCriaAbierta());
            row.createCell(11).setCellValue(c.getPorcentajeCuadro() != null ? c.getPorcentajeCuadro().doubleValue() : 0);
            row.createCell(12).setCellValue(c.getReinas());
            row.createCell(13).setCellValue(c.getReservaAlimento());
            row.createCell(14).setCellValue(c.getAlimentacionArtificial());
            row.createCell(15).setCellValue(c.getComportamientoHigienico());
            row.createCell(16).setCellValue(c.getEstadoSanitario());
            row.createCell(17).setCellValue(c.getObservaciones() != null ? c.getObservaciones() : "");

            for (int i = 0; i < headers.length; i++) {
                row.getCell(i).setCellStyle(dataStyle);
            }
        }

        // Auto-size
        for (int i = 0; i < headers.length; i++) {
            sheet.autoSizeColumn(i);
        }
    }

    private void crearHojaCosechas(XSSFWorkbook workbook) {
        Sheet sheet = workbook.createSheet("Registros Cosecha");
        List<RegistroCosecha> cosechas = cosechaRepository.findAllByOrderByFechaDesc();

        CellStyle headerStyle = crearEstiloHeader(workbook);
        CellStyle dataStyle = crearEstiloData(workbook);

        String[] headers = {
            "ID", "Colmena", "Fecha", "Alza", "Cuadro",
            "Método Extracción", "Cuadro Reemplazo",
            "Faltantes Con Cera", "Faltantes Sin Cera"
        };

        Row headerRow = sheet.createRow(0);
        for (int i = 0; i < headers.length; i++) {
            Cell cell = headerRow.createCell(i);
            cell.setCellValue(headers[i]);
            cell.setCellStyle(headerStyle);
        }

        int rowNum = 1;
        for (RegistroCosecha r : cosechas) {
            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(r.getId());
            row.createCell(1).setCellValue(r.getColmenaId());
            row.createCell(2).setCellValue(r.getFecha().toString());
            row.createCell(3).setCellValue(r.getAlza());
            row.createCell(4).setCellValue(r.getCuadro());
            row.createCell(5).setCellValue(r.getMetodoExtraccion());
            row.createCell(6).setCellValue(r.getCuadroReemplazo());
            row.createCell(7).setCellValue(r.getCuadrosFaltantesConCera() != null ? r.getCuadrosFaltantesConCera() : 0);
            row.createCell(8).setCellValue(r.getCuadrosFaltantesSinCera() != null ? r.getCuadrosFaltantesSinCera() : 0);

            for (int i = 0; i < headers.length; i++) {
                row.getCell(i).setCellStyle(dataStyle);
            }
        }

        for (int i = 0; i < headers.length; i++) {
            sheet.autoSizeColumn(i);
        }
    }

    private void crearHojaResumen(XSSFWorkbook workbook) {
        Sheet sheet = workbook.createSheet("Resumen");

        CellStyle titleStyle = workbook.createCellStyle();
        Font titleFont = workbook.createFont();
        titleFont.setBold(true);
        titleFont.setFontHeightInPoints((short) 14);
        titleStyle.setFont(titleFont);

        CellStyle dataStyle = crearEstiloData(workbook);

        Row titleRow = sheet.createRow(0);
        Cell titleCell = titleRow.createCell(0);
        titleCell.setCellValue("Reporte Consolidado - Gestión de Colmenas");
        titleCell.setCellStyle(titleStyle);

        Row infoRow = sheet.createRow(2);
        infoRow.createCell(0).setCellValue("Total Chequeos:");
        infoRow.createCell(1).setCellValue(chequeoRepository.count());
        infoRow.getCell(1).setCellStyle(dataStyle);

        Row infoRow2 = sheet.createRow(3);
        infoRow2.createCell(0).setCellValue("Total Cosechas:");
        infoRow2.createCell(1).setCellValue(cosechaRepository.count());
        infoRow2.getCell(1).setCellStyle(dataStyle);

        Row infoRow3 = sheet.createRow(4);
        infoRow3.createCell(0).setCellValue("Fecha Generación:");
        infoRow3.createCell(1).setCellValue(java.time.LocalDateTime.now().toString());
        infoRow3.getCell(1).setCellStyle(dataStyle);

        sheet.autoSizeColumn(0);
        sheet.autoSizeColumn(1);
    }

    private CellStyle crearEstiloHeader(XSSFWorkbook workbook) {
        CellStyle style = workbook.createCellStyle();
        Font font = workbook.createFont();
        font.setBold(true);
        font.setColor(IndexedColors.WHITE.getIndex());
        style.setFont(font);
        style.setFillForegroundColor(IndexedColors.DARK_YELLOW.getIndex());
        style.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        style.setBorderBottom(BorderStyle.THIN);
        style.setBorderTop(BorderStyle.THIN);
        style.setBorderLeft(BorderStyle.THIN);
        style.setBorderRight(BorderStyle.THIN);
        return style;
    }

    private CellStyle crearEstiloData(XSSFWorkbook workbook) {
        CellStyle style = workbook.createCellStyle();
        style.setBorderBottom(BorderStyle.THIN);
        style.setBorderTop(BorderStyle.THIN);
        style.setBorderLeft(BorderStyle.THIN);
        style.setBorderRight(BorderStyle.THIN);
        return style;
    }
}
