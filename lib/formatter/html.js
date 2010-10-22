var HtmlFormatter = {
  formatArray: function(items) {
    
    var table = $("<table />")
    var displayedColumns = []

    if(items.length>0) {
      $.each(items, function(i, item) {
        var tr = $("<tr />")
        for(var n in item) {
          var property = item[n]
          if(property) {
            switch(property.constructor) {
            case Number:
            case String: 
              if(!_.any(displayedColumns, function(foundColumnNumber) {return foundColumnNumber===n})) {
                displayedColumns.push(n)
              }
              tr.append("<td>" + property + "</td>")
            }
          }
          else {
            tr.append("<td />")
            if(!_.any(displayedColumns, function(foundColumnNumber) {return foundColumnNumber===n})) {
              displayedColumns.push(n)
            }
          }
        }

        table.append(tr)
      })
        
      var tr = $("<tr />")
      var item = items[0]
      for(var i in item) {
        if(_.any(displayedColumns, function(foundColumnNumber) {return foundColumnNumber===i})) {
          tr.append("<th>" + i + "</th>")
        }
      }
      thead = $("<thead />").append(tr)
      table.prepend(thead)
      
      return table[0].outerHTML
    }
  }
}
