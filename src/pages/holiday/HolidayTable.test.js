import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import pretty from "pretty";

import HolidayTable from "./HolidayTable";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders Holiday data", async () => {
  const fakeHoliday = [
    {
      date: "2020/1/1",
      name: "中華民國開國紀念日",
      isHoliday: "是",
      holidayCategory: "放假之紀念日及節日",
      description: "全國各機關學校放假一日。",
    },
    {
      date: "2020/1/4",
      name: "",
      isHoliday: "是",
      holidayCategory: "星期六、星期日",
      description: "",
    },
    {
      date: "2020/1/23",
      name: "",
      isHoliday: "是",
      holidayCategory: "調整放假日",
      description: "",
    },
    {
      date: "2020/1/28",
      name: "",
      isHoliday: "是",
      holidayCategory: "補假",
      description: "",
    },
  ];

  // Use the asynchronous version of act to apply resolved promises
  act(() => {
    render(<HolidayTable rows={fakeHoliday} />, container);
  });

  expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
    "<div class=\\"MuiTableContainer-root\\">
      <table class=\\"MuiTable-root sc-bdfBwQ gWEOTZ\\" aria-label=\\"year-table\\">
        <thead class=\\"MuiTableHead-root sc-gsTCUz hGCMFc\\">
          <tr class=\\"MuiTableRow-root MuiTableRow-head\\">
            <th class=\\"MuiTableCell-root MuiTableCell-head sc-hKgILt epsYRg MuiTableCell-alignCenter\\" scope=\\"col\\">日期</th>
            <th class=\\"MuiTableCell-root MuiTableCell-head sc-hKgILt epsYRg MuiTableCell-alignCenter\\" scope=\\"col\\">放假名稱</th>
            <th class=\\"MuiTableCell-root MuiTableCell-head sc-hKgILt epsYRg MuiTableCell-alignCenter\\" scope=\\"col\\">類型</th>
            <th class=\\"MuiTableCell-root MuiTableCell-head sc-hKgILt epsYRg MuiTableCell-alignCenter\\" scope=\\"col\\">其他資訊</th>
          </tr>
        </thead>
        <tbody class=\\"MuiTableBody-root\\">
          <tr class=\\"MuiTableRow-root sc-dlfnbm dWhvSf\\">
            <td class=\\"MuiTableCell-root MuiTableCell-body sc-eCssSg hLrwXH MuiTableCell-alignLeft\\">2020/1/1<p>Wednesday</p>
            </td>
            <td class=\\"MuiTableCell-root MuiTableCell-body sc-eCssSg hLrwXH MuiTableCell-alignLeft\\">中華民國開國紀念日</td>
            <td class=\\"MuiTableCell-root MuiTableCell-body sc-eCssSg hLrwXH MuiTableCell-alignLeft\\">放假之紀念日及節日</td>
            <td class=\\"MuiTableCell-root MuiTableCell-body sc-eCssSg hLrwXH MuiTableCell-alignLeft\\">全國各機關學校放假一日。</td>
          </tr>
          <tr class=\\"MuiTableRow-root sc-dlfnbm dWhvSf\\">
            <td class=\\"MuiTableCell-root MuiTableCell-body sc-eCssSg hLrwXH MuiTableCell-alignLeft\\">2020/1/4<p>Saturday</p>
            </td>
            <td class=\\"MuiTableCell-root MuiTableCell-body sc-eCssSg hLrwXH MuiTableCell-alignLeft\\"></td>
            <td class=\\"MuiTableCell-root MuiTableCell-body sc-eCssSg hLrwXH MuiTableCell-alignLeft\\">星期六、星期日</td>
            <td class=\\"MuiTableCell-root MuiTableCell-body sc-eCssSg hLrwXH MuiTableCell-alignLeft\\"></td>
          </tr>
          <tr class=\\"MuiTableRow-root sc-dlfnbm dWhvSf\\">
            <td class=\\"MuiTableCell-root MuiTableCell-body sc-eCssSg hLrwXH MuiTableCell-alignLeft\\">2020/1/23<p>Thursday</p>
            </td>
            <td class=\\"MuiTableCell-root MuiTableCell-body sc-eCssSg hLrwXH MuiTableCell-alignLeft\\"></td>
            <td class=\\"MuiTableCell-root MuiTableCell-body sc-eCssSg hLrwXH MuiTableCell-alignLeft\\">調整放假日</td>
            <td class=\\"MuiTableCell-root MuiTableCell-body sc-eCssSg hLrwXH MuiTableCell-alignLeft\\"></td>
          </tr>
          <tr class=\\"MuiTableRow-root sc-dlfnbm dWhvSf\\">
            <td class=\\"MuiTableCell-root MuiTableCell-body sc-eCssSg hLrwXH MuiTableCell-alignLeft\\">2020/1/28<p>Tuesday</p>
            </td>
            <td class=\\"MuiTableCell-root MuiTableCell-body sc-eCssSg hLrwXH MuiTableCell-alignLeft\\"></td>
            <td class=\\"MuiTableCell-root MuiTableCell-body sc-eCssSg hLrwXH MuiTableCell-alignLeft\\">補假</td>
            <td class=\\"MuiTableCell-root MuiTableCell-body sc-eCssSg hLrwXH MuiTableCell-alignLeft\\"></td>
          </tr>
        </tbody>
      </table>
    </div>"
  `);

  const allTableData = container.querySelectorAll('table tbody tr td')
  expect(allTableData[0].textContent).toBe(`${fakeHoliday[0].date}Wednesday`)
  expect(allTableData[1].textContent).toBe(fakeHoliday[0].name)
  expect(allTableData[2].textContent).toBe(fakeHoliday[0].holidayCategory)
  expect(allTableData[3].textContent).toBe(fakeHoliday[0].description)
  expect(allTableData[4].textContent).toBe(`${fakeHoliday[1].date}Saturday`)
  expect(allTableData[5].textContent).toBe(fakeHoliday[1].name)
  expect(allTableData[6].textContent).toBe(fakeHoliday[1].holidayCategory)
  expect(allTableData[7].textContent).toBe(fakeHoliday[1].description)
});
