
# json2html

A simple library for converting json and arrays of json objects to an html table.  Ideal for quickly prototyping things.  Especially handy for working with APIs that will hand you back arrays of json.  The only assumption is that the objects in the arrays all have identical structures (which is the case for many APIs, github's for instance). 

Here's an example:

    var data = [
      {propA:"value1", propB: "value2", propC: "value3"},
      {propA:"value4", propB: "value5", propC: "value6"}
    ]
    var formatter = new HtmlFormatter();
    var htmlString = formatter.formatArray(data)

Will generate the table:

    <table>
        <thead>
                <tr>
                        <th>propA</th><th>propB</th><th>propC</th>
                </tr>
        </thead>
        <tbody>
                <tr>
                        <td>value1</td><td>value2</td><td>value3</td>
                        <td>value4</td><td>value5</td><td>value6</td>
                </tr>
        </tbody>
    </table>

You can register titles for the headers:

    formatter.registerDisplayNames({propA:"Property A", propB:"Property B"})
    
Or add hooks to manipulate or not show certain data:

    // add class to the generated TD:
    formatter.onProperty("propA", function(value, element){ element.className="fancyClass"; return element})

    // show something completely arbirary instead:
    formatter.onProperty("propA", function(value, element){ return $('<td>').html("meow")})

    // don't show certain objects
    formatter.onObject(function(value, element){ if(value.propA==="value1") return false; })

Additionally, you can specify which fields to display and in which order:

    // only show property C and property A in the order given:
    formatter.display(["propC", "propA"])

If you don't explicitly tell it which fields to display,  it will automatically ignore properties that can't be gracefully displayed as a string (objects, arrays, etc).

Right now it has a dependancy on jQuery, which may later be removed. So far this has only been tested in chrome and firefox.  

Included in the repo is an example in index.htm that uses jquery tablesorter to give you some sortable data.

## License 

(The MIT License)

Copyright (c) 2009 Your Name &lt;Your Email&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
