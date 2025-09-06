// src/components/common/utils.ts
import {
  Answers,
  Scores,
  TestConfig,
  TestResult,
  PersonalityDescriptions,
} from "./types";
import { testConfig } from "./TestConfig";
import { personalityDescriptions } from "./PersonalityDescriptions";
import { jsPDF } from "jspdf";

export const calculateScores = (answers: Answers): Scores => {
  let XX = 0,
    X = 0,
    XXX = 0;

  for (let i = 1; i <= 57; i++) {
    const config = testConfig[i];
    const userAnswer = answers[i];

    if (userAnswer === config.validAnswer) {
      switch (config.scale) {
        case "_":
          _++;
          break;
        case "_":
          ¨_++;
          break;
        case "?":
          ?++;
          break;
      }
    }
  }

  return { ?, ?, ? };
};

export const getPersonalityType = (?: number, ?: number): string => {
  let type = "";

  if (? >= 12 && ? >= 12) type = "COLERICO";
  else if (? >= 12 && ? < 12) type = "SANGUINEO";
  else if (? < 12 && ? < 12) type = "FLEMATICO";
  else type = "MELANCOLICO";

  const isExtreme = ? <= 3 || ? >= 21 || ? <= 3 || ? >= 21;
  return isExtreme ? `MUY ${type}` : type;
};

export const getRandomDescription = (type: string): string => {
  const baseType = type.replace("MUY ", "");
  const descriptions = personalityDescriptions[baseType];
  return descriptions[Math.floor(Math.random() * descriptions.length)];
};

 export const generatePDF = (testResult: TestResult) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  let y = 20;

  // === Encabezado elegante ===
  doc.setFillColor(59, 130, 246);
  doc.rect(0, 0, pageWidth, 35, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255);
  doc.text("Inventario de Personalidad Eysenck", pageWidth / 2, 22, { align: "center" });

  doc.setFontSize(12);
  doc.text("Formato B - Evaluación Psicológica", pageWidth / 2, 30, { align: "center" });

  y += 25;

  // === Información del sujeto ===
  y += 10;
  doc.setTextColor(31, 41, 55);
  doc.setFontSize(13);
  doc.text("Datos del sujeto evaluado :", margin, y);

  y += 6;
  doc.setDrawColor(200);
  doc.line(margin, y, pageWidth - margin, y);

  y += 8;
  doc.setFontSize(11);
  doc.setTextColor(55, 65, 81);
  doc.text(`Código: ${testResult.subjectCode}`, margin, y);
  doc.text(`Cargo: ${testResult.Duty}`, pageWidth / 2, y);

  y += 7;
  doc.text(`Fecha: ${new Date(testResult.timestamp).toLocaleDateString()}`, margin, y);
  doc.text(`Hora: ${new Date(testResult.timestamp).toLocaleTimeString()}`, pageWidth / 2, y);

  // === Resultados ===
  y += 15;
  doc.setFontSize(13);
  doc.setTextColor(31, 41, 55);
  doc.text("Resultados de la evaluación psicológica :", margin, y);

  y += 6;
  doc.setDrawColor(200);
  doc.line(margin, y, pageWidth - margin, y);

  y += 8;
  doc.setFontSize(11);
  doc.setTextColor(55, 65, 81);
  doc.text(`Escala de Control (L): ${testResult.scores.L}/9`, margin, y);
  doc.text(`Extroversión (E): ${testResult.scores.E}/24`, pageWidth / 2, y);

  y += 7;
  doc.text(`Neuroticismo (N): ${testResult.scores.N}/24`, margin, y);
  doc.text(`Evaluador: Dr. Tito Real`, pageWidth / 2, y);

  y += 12;
  // Etiqueta de confiabilidad
  doc.setFontSize(10);
  if (testResult.isReliable) {
    doc.setTextColor(22, 163, 74);
    doc.setFillColor(220, 252, 231);
    doc.roundedRect(margin, y, 40, 8, 2, 2, "F");
    doc.text("Confiable", margin + 20, y + 6, { align: "center" });
  } else {
    doc.setTextColor(220, 38, 38);
    doc.setFillColor(254, 226, 226);
    doc.roundedRect(margin, y, 55, 8, 2, 2, "F");
    doc.text("Resultados no confiables", margin + 27.5, y + 6, { align: "center" });
  }

  if (!testResult.isComplete) {
    doc.setFillColor(254, 252, 232);
    doc.setTextColor(146, 64, 14);
    doc.roundedRect(pageWidth - margin - 50, y, 50, 8, 2, 2, "F");
    doc.text(`${testResult.completionPercentage}% completado`, pageWidth - margin - 25, y + 6, { align: "center" });
  }

  y += 20;

  // === Tipo de personalidad ===
  doc.setFontSize(13);
  doc.setTextColor(31, 41, 55);
  doc.text("INTERPRETACIÓN :", margin, y);

  y += 6;
  doc.setDrawColor(200);
  doc.line(margin, y, pageWidth - margin, y);

  y += 10;
  doc.setFontSize(12);
  doc.setTextColor(91, 33, 182);
  doc.text(`Tipo: ${testResult.personalityType}`, margin, y);

  y += 7;
  doc.setFontSize(10);
  doc.setTextColor(55, 65, 81);
  const descLines = doc.splitTextToSize(testResult.description, pageWidth - 2 * margin);
  doc.text(descLines, margin, y + 5);
  y += descLines.length * 5 + 10;

  // === Notas ===
  if (!testResult.isReliable || !testResult.isComplete) {
    doc.setFontSize(9);
    doc.setTextColor(146, 64, 14);
    let notes = [];
    if (!testResult.isReliable)
      notes.push("Nota: Resultados posiblemente no confiables (puntaje alto en escala L).");
    if (!testResult.isComplete)
      notes.push(`Nota: El test fue incompleto (${testResult.completionPercentage}%)`);

    const notesText = doc.splitTextToSize(notes.join(" "), pageWidth - 2 * margin);
    doc.text(notesText, margin, y);
    y += notesText.length * 5 + 5;
  }

  // === Firma y generación ===
  doc.setDrawColor(220);
  doc.line(margin, pageHeight - 20, pageWidth - margin, pageHeight - 20);

  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text("Examinador: Dr. Tito Real - Psicólogo Industrial", margin, pageHeight - 15);
  doc.text(`Generado: ${new Date().toLocaleDateString()}`, pageWidth - margin, pageHeight - 15, { align: "right" });

  doc.save(`Test_Eysenck_${testResult.subjectCode}.pdf`);
};

