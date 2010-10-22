(function() {
  var HtmlFormatter = function() {
    this.aliases = {},
    this.propertyHooks = [];
  }
  HtmlFormatter.prototype = {
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
        for(var i=0;i<items.length;i++) {
          var item = items[i]
          var tr = $("<tr />")
          for(var propertyName in item) {
            var propertyValue = item[propertyName]
            if(propertyValue) {
              switch(propertyValue.constructor) {
              case Number:
              case String: 
                markPropertyForDisplay(propertyName)
                var elem = $("<td>" + propertyValue + "</td>") 
                elem = applyHooks.call(this, propertyName, propertyValue, elem[0])
                tr.append(elem)
              }
            }
            else {
              markPropertyForDisplay(propertyName)
              tr.append("<td />")
            }
          }

          table.append(tr)
        }
        
        var tr = $("<tr />")
        var item = items[0]
        for(var propertyName in item) {
          if(propertiesToDisplay[propertyName]) {
            tr.append("<th>" + (this.aliases[propertyName] ? this.aliases[propertyName] : propertyName) + "</th>")
          }
        }
        table.prepend($("<thead />").append(tr))
        
        return table[0].outerHTML
      }
    },
    registerDisplayNames: function(aliases) {
      this.aliases=aliases
    },
    onProperty: function(name, callback) {
      var hook = {}
      hook[name] = callback
      this.propertyHooks.push(hook)
    }
  }

  var applyHooks = function(name, value, elem) {
    for(var i=0;i<this.propertyHooks.length;i++) {
      var hook = this.propertyHooks[i]
      if(hook[name]) {
        elem = hook[name](value, elem) || elem
      }
    }
    return elem
  }

  window.HtmlFormatter = HtmlFormatter
} ())
