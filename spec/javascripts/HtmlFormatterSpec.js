describe("HtmlFormatter", function() {
  var jsonArray, jsonObject;

  beforeEach(function() {
    jsonObject = {a:"a", b: "b"}
    jsonArray = [jsonObject]
  });

  it("should format an jsonArray of elements", function() {
    expect(HtmlFormatter.formatArray(jsonArray)).toEqual("<table><thead><tr><th>a</th><th>b</th></tr></thead><tbody><tr><td>a</td><td>b</td></tr></tbody></table>")
  })

  it("should ignore array properties", function() {
    jsonObject.c=[1,2,3]
    expect(HtmlFormatter.formatObject(jsonObject)).toEqual("<table><thead><tr><th>a</th><th>b</th></tr></thead><tbody><tr><td>a</td><td>b</td></tr></tbody></table>")
  })

  it("should ignore object properties", function() {
    jsonArray[0].c={}
    expect(HtmlFormatter.formatObject(jsonObject)).toEqual("<table><thead><tr><th>a</th><th>b</th></tr></thead><tbody><tr><td>a</td><td>b</td></tr></tbody></table>")
  })
})
