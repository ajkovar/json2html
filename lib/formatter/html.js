var HtmlFormatter = {
  formatObject: function(item) {
    return this.formatArray([item])
  },

  formatArray: function(items) {
    
    var propertiesToDisplay = {}
    var markPropertyForDisplay = function(propertyName) {
      if(!propertiesToDisplay[propertyName]) {
        propertiesToDisplay[propertyName]=true
      }
    }

    var table = $("<table />")

    if(items.length>0) {
      $.each(items, function(i, item) {
        var tr = $("<tr />")
        for(var propertyName in item) {
          var propertyValue = item[propertyName]
          if(propertyValue) {
            switch(propertyValue.constructor) {
            case Number:
            case String: 
              markPropertyForDisplay(propertyName)
              tr.append("<td>" + propertyValue + "</td>")
            }
          }
          else {
            markPropertyForDisplay(propertyName)
            tr.append("<td />")
          }
        }

        table.append(tr)
      })
        
      var tr = $("<tr />")
      var item = items[0]
      for(var propertyName in item) {
        if(propertiesToDisplay[propertyName]) {
          tr.append("<th>" + propertyName + "</th>")
        }
      }
      table.prepend($("<thead />").append(tr))
      
      return table[0].outerHTML
    }
  }
}
