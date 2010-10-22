describe("HtmlFormatter", function() {
  var array;

  beforeEach(function() {
    array = [{a:"a", b: "b"}]
  });

  it("should format an array of elements", function() {
    expect(HtmlFormatter.formatArray(array)).toEqual("<table><thead><tr><th>a</th><th>b</th></tr></thead><tbody><tr><td>a</td><td>b</td></tr></tbody></table>")
  })

})
