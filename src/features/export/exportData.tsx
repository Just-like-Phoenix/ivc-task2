import { Stimulsoft } from "stimulsoft-reports-js/Scripts/stimulsoft.viewer";

export function exportData({
  inputData,
  keys,
  selectedRows,
  type,
}: {
  inputData: any[];
  keys: string[];
  selectedRows: number[];
  type: string;
}) {
  let reportData: any[] = [];
  let pos = 0;
  let nameIndex = 1;

  selectedRows.forEach((e) => {
    reportData.push(inputData[e]);
  });

  const dataSet = new Stimulsoft.System.Data.DataSet();
  dataSet.readJson(reportData);
  const data = dataSet.tables.getByIndex(0);
  const report = new Stimulsoft.Report.StiReport();
  //const viewer = new Stimulsoft.Viewer.StiViewer();

  report.regData("data", "data", dataSet);

  const dataSource = new Stimulsoft.Report.Dictionary.StiDataTableSource(
    data.tableName,
    data.tableName,
    data.tableName
  );
  keys.forEach((e) => {
    dataSource.columns.add(
      new Stimulsoft.Report.Dictionary.StiDataColumn(e, e, e)
    );
  });
  report.dictionary.dataSources.add(dataSource);

  const page = report.pages.getByIndex(0);

  const headerBand = new Stimulsoft.Report.Components.StiHeaderBand();
  headerBand.height = 0.5;
  headerBand.name = "HeaderBand";
  page.components.add(headerBand);

  const dataBand = new Stimulsoft.Report.Components.StiDataBand();
  dataBand.dataSourceName = data.tableName;
  dataBand.height = 0.5;
  dataBand.name = "DataBand";
  page.components.add(dataBand);

  const columnWidth = Stimulsoft.Base.StiAlignValue.alignToMinGrid(
    page.width / data.columns.count,
    0.1,
    true
  );

  for (let index in data.columns.list) {
    const dataColumn = data.columns.list[index];

    const headerText = new Stimulsoft.Report.Components.StiText();
    headerText.clientRectangle = new Stimulsoft.System.Drawing.Rectangle(
      pos,
      0,
      columnWidth,
      0.5
    );
    headerText.text = dataColumn.caption;
    headerText.horAlignment =
      Stimulsoft.Base.Drawing.StiTextHorAlignment.Center;
    headerText.name = "HeaderText" + nameIndex.toString();
    headerText.brush = new Stimulsoft.Base.Drawing.StiSolidBrush(
      Stimulsoft.System.Drawing.Color.lightGreen
    );
    headerText.border.side = Stimulsoft.Base.Drawing.StiBorderSides.All;
    headerBand.components.add(headerText);

    const dataText = new Stimulsoft.Report.Components.StiText();
    dataText.clientRectangle = new Stimulsoft.System.Drawing.Rectangle(
      pos,
      0,
      columnWidth,
      0.5
    );
    dataText.text = `{${data.tableName}.${dataColumn.columnName}}`;
    dataText.name = "DataText" + nameIndex.toString();
    dataText.border.side = Stimulsoft.Base.Drawing.StiBorderSides.All;
    dataBand.components.add(dataText);

    pos = pos + columnWidth;

    nameIndex++;
  }

  const footerBand = new Stimulsoft.Report.Components.StiFooterBand();
  footerBand.height = 0.5;
  footerBand.name = "FooterBand";
  page.components.add(footerBand);

  function saveReportPdf() {
    report.exportDocumentAsync(function (report: any) {
      Stimulsoft.System.StiObject.saveAs(
        report,
        Date.now().toString() + ".pdf",
        "application/pdf"
      );
    }, Stimulsoft.Report.StiExportFormat.Pdf);
  }

  function saveReportExcel() {
    report.exportDocumentAsync(function (report: any) {
      Stimulsoft.System.StiObject.saveAs(
        report,
        Date.now().toString() + ".xls",
        "application/vnd.ms-excel"
      );
    }, Stimulsoft.Report.StiExportFormat.Excel2007);
  }

  report.renderAsync(function () {
    type === "pdf" ? saveReportPdf() : saveReportExcel();
  });

  // viewer.report = report;
  // viewer.renderHtml();
}
