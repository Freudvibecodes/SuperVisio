import { NextRequest, NextResponse } from 'next/server'
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx'

export async function POST(request: NextRequest) {
  try {
    const { studentName, sessionName, formData } = await request.json()

    const children: Paragraph[] = []

    children.push(
      new Paragraph({
        text: 'Clinical Supervision Record',
        heading: HeadingLevel.HEADING_1,
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 },
      }),
      new Paragraph({
        children: [
          new TextRun({ text: `Student: `, bold: true }),
          new TextRun({ text: studentName }),
        ],
        spacing: { after: 100 },
      }),
      new Paragraph({
        children: [
          new TextRun({ text: `Session: `, bold: true }),
          new TextRun({ text: sessionName }),
        ],
        spacing: { after: 300 },
      })
    )

    for (const [field, value] of Object.entries(formData)) {
      children.push(
        new Paragraph({
          children: [new TextRun({ text: field, bold: true, size: 24 })],
          spacing: { before: 200, after: 80 },
        }),
        new Paragraph({
          children: [new TextRun({ text: value as string, size: 22 })],
          spacing: { after: 200 },
          border: {
            bottom: { color: 'CCCCCC', size: 1, style: 'single' },
          },
        })
      )
    }

    children.push(
      new Paragraph({
        children: [new TextRun({ text: 'Supervisor Signature: ________________________', size: 22 })],
        spacing: { before: 400 },
      }),
      new Paragraph({
        children: [new TextRun({ text: 'Date: ________________________', size: 22 })],
        spacing: { before: 200 },
      })
    )

    const doc = new Document({
      sections: [{
        properties: {},
        children,
      }],
    })

    const buffer = await Packer.toBuffer(doc)

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': `attachment; filename="${studentName}-supervision-form.docx"`,
      },
    })

  } catch (error) {
    console.log('Export error:', error)
    return NextResponse.json({ error: 'Failed to export form' }, { status: 500 })
  }
}