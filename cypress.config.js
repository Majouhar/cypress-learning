const { defineConfig } = require("cypress");
const ExcelJs = require("exceljs");
const {
  addCucumberPreprocessorPlugin,
} = require("@badeball/cypress-cucumber-preprocessor");
const {
  preprocessor,
} = require("@badeball/cypress-cucumber-preprocessor/browserify");

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    charts: true,
    reportPageTitle: "custom-title",
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    screenshotOnRunFailure: true,
  },
  defaultCommandTimeout: 4000,
  env: {
    url: "https://rahulshettyacademy.com",
  },
  e2e: {
    async setupNodeEvents(on, config) {
      // implement node event listeners here
      await addCucumberPreprocessorPlugin(on, config),
        {
          omitBeforeRunHandler: true,
          omitAfterRunHandler: true,
          omitBeforeSpecHandler: true,
          omitAfterSpecHandler: true,
          omitAfterScreenshotHandler: true,
        };

      on("file:preprocessor", preprocessor(config));

      on("task", {
        async writeExcelTest({ searchText, replaceText, change, filePath }) {
          const workbook = new ExcelJs.Workbook();
          await workbook.xlsx.readFile(filePath);
          const worksheet = workbook.getWorksheet("Sheet1");
          const output = await readExcel(worksheet, searchText);
          console.log(filePath)
          const cell = worksheet.getCell(
            output.row,
            output.column + change.colChange
          );
          cell.value = replaceText;
          await workbook.xlsx.writeFile(filePath);
          return true
        },
      });

      // require("cypress-mochawesome-reporter/plugin")(on);
      return config;
    },
    specPattern: "cypress/integration/*.js",
    // specPattern: "cypress/integration/BDD/*.feature",
    viewportHeight: 800,
    viewportWidth: 1280,
  },
  video: true,
  retries: {
    runMode: 1, //retry ==1 ,
  },
});

async function readExcel(worksheet, searchText) {
  let output = { row: -1, column: -1 };
  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      if (cell.value === searchText) {
        output.row = rowNumber;
        output.column = colNumber;
      }
    });
  });
  return output;
}
