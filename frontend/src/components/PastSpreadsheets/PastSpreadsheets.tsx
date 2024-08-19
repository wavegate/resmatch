import { Title, List } from "@mantine/core";

export default () => {
  return (
    <div>
      <h4 className="font-medium mb-2 text-xl">Past Year Spreadsheets</h4>
      <List spacing="xs" icon="•">
        <List.Item>
          <a
            href="https://docs.google.com/spreadsheets/d/1nZFNdyiVo9CoFsC0QMy_8WNSF-ZPm8DxXIC8Vfj5OWQ/edit#gid=617331436"
            className="text-blue-600"
          >
            IM Spreadsheet 2018-2019
          </a>
        </List.Item>
        <List.Item>
          <a
            href="https://docs.google.com/spreadsheets/d/1Hev7hguZJ4iXzGlzxhOB1VXIHA5pxxMydnlQszHpgmc/edit#gid=1192958690"
            className="text-blue-600"
          >
            IM Spreadsheet 2019-2020
          </a>
        </List.Item>
        <List.Item>
          <a
            href="https://docs.google.com/spreadsheets/d/16qMjrElK6QO7DfF-TwLrK6AO5RmVKd-57ejQ6K84Ymw/edit?usp=sharing"
            className="text-blue-600"
          >
            IM Spreadsheet 2020-2021
          </a>
        </List.Item>
        <List.Item>
          <a
            href="https://docs.google.com/spreadsheets/d/18vUuXREUtkTwLOn933X3C49T4TDtBDqb38JFNI-JyRI/edit#gid=0"
            className="text-blue-600"
          >
            IM Spreadsheet 2021-2022
          </a>
        </List.Item>
        <List.Item>
          <a
            href="https://docs.google.com/spreadsheets/d/1GBCaw0wDkGfbZfKL1PPxb3wQS6LC4eVm/edit?usp=share_link&ouid=101048199704315475262&rtpof=true&sd=true"
            className="text-blue-600"
          >
            IM Spreadsheet 2022-2023
          </a>
        </List.Item>
        <List.Item>
          <a
            href="https://docs.google.com/spreadsheets/d/1xmcg2AAkr50O4mGtlPDr5-Kc7e4hMwgw5lfMAEJdMUc/edit#gid=2113631940"
            className="text-blue-600"
          >
            IM Spreadsheet 2023-2024
          </a>
        </List.Item>
      </List>
    </div>
  );
};
