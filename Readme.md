
# json2html

A simple library for converting json and arrays of json objects to an html table.  Ideal for quickly prototyping things.  Especially handy for working with APIs that will hand you back arrays of json.  The only assumption is that the objects in the arrays all have identical structures (which is the case for many APIs, github's for instance). 

Here's an example:

    var data = [
      {propA:"value1", propB: "value2"},
      {propA:"value3", propB: "value4"}
    ]
    var formatter = new HtmlFormatter();
    var htmlString = formatter.formatArray(data)

Will generate the table:

    <table>
        <thead>
                <tr>
                        <th>propA</th><th>propB</th>
                </tr>
        </thead>
        <tbody>
                <tr>
                        <td>value1</td><td>value2</td>
                        <td>value3</td><td>value4</td>
                </tr>
        </tbody>
    </table>

You can register titles for the headers:

    formatter.registerDisplayNames({propA:"Property A", propB:"Property B"})
    
Or add hooks to manipulate or not show certain data:

    formatter.onProperty("propA", function(value, element){ element.className="fancyClass"; return element})
    formatter.onObject(function(value, element){ return false; /*Don't show this row */})

It will automatically ignore properties that can't be gracefully displayed as a string (objects, arrays, etc).

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
