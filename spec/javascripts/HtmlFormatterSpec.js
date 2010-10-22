describe("HtmlFormatter", function() {
  var jsonArray, jsonObject, formatter;

  beforeEach(function() {
    jsonObject = {a:"a", b: "b"}
    jsonArray = [jsonObject]
    formatter = new HtmlFormatter();
  });

  it("should format an jsonArray of elements", function() {
    expect(formatter.formatArray(jsonArray)).toEqual("<table><thead><tr><th>a</th><th>b</th></tr></thead><tbody><tr><td>a</td><td>b</td></tr></tbody></table>")
  })

  it("should ignore array properties", function() {
    jsonObject.c=[1,2,3]
    expect(formatter.formatObject(jsonObject)).toEqual("<table><thead><tr><th>a</th><th>b</th></tr></thead><tbody><tr><td>a</td><td>b</td></tr></tbody></table>")
  })

  it("should ignore object properties", function() {
    jsonArray[0].c={}
    expect(formatter.formatObject(jsonObject)).toEqual("<table><thead><tr><th>a</th><th>b</th></tr></thead><tbody><tr><td>a</td><td>b</td></tr></tbody></table>")
  })

  it("should allow you to register aliases for property names in header", function() {
    formatter.registerDisplayNames({a: "alias for a"})
    expect(formatter.formatObject(jsonObject)).toEqual("<table><thead><tr><th>alias for a</th><th>b</th></tr></thead><tbody><tr><td>a</td><td>b</td></tr></tbody></table>")
  })

  it("should allow you to add hooks for each object property", function() {
    formatter.onProperty("a", function(value, element) {
      if(value==="a") {
        element.className="test"
      }
      return element
    })
    expect(formatter.formatObject(jsonObject)).toEqual("<table><thead><tr><th>a</th><th>b</th></tr></thead><tbody><tr><td class=\"test\">a</td><td>b</td></tr></tbody></table>")
  })

})
