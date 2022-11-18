import { Selector } from "testcafe";

fixture("Lifecycle").page("https://google.com");

test("Search bar exists", async (t) => {
  await t.expect(Selector('input[title="Search"]').exists).ok();
});
