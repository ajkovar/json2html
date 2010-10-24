(function() {
  var HtmlFormatter = function() {
    this.aliases = {},
    this.propertyHooks = []
    this.objectHooks = [];
  }
  HtmlFormatter.prototype = {
    formatObject: function(item) {
      return this.formatArray([item])
    },

    formatArray: function(items) {
      var self = this;
      
      var propertiesToDisplay = {}
      var markPropertyForDisplay = function(propertyName) {
        if(!propertiesToDisplay[propertyName]) {
          propertiesToDisplay[propertyName]=true
        }
      }

      var renderCell = function(propertyName, propertyValue) {
        markPropertyForDisplay(propertyName)
        var elem = $("<td>" + (propertyValue ? propertyValue : "") + "</td>") 
        elem = applyPropertyHooks.call(self, propertyName, propertyValue, elem[0])
        return elem
      }

      var table = $("<table />")

      if(items.length>0) {
        
        
        for(var i=0;i<items.length;i++) {
          var item = items[i]
          var tr = $("<tr />")
          if(this.displayedProperties) {
            for(var j=0;j<this.displayedProperties.length;j++) {
              var propertyName = this.displayedProperties[j]
              var propertyValue = item[propertyName]
              tr.append(renderCell(propertyName, propertyValue))
            }
          }
          else {
            for(var propertyName in item) {
              var propertyValue = item[propertyName]
              if(propertyValue) {
                switch(propertyValue.constructor) {
                case Number:
                case String: 
                  tr.append(renderCell(propertyName, propertyValue))
                }
              }
              else {
                tr.append(renderCell(propertyName, propertyValue))
              }
            }
          }

          tr = applyObjectHooks.call(this, item, tr)

          if(tr) {
            table.append(tr)
          }
        }
        
        var tr = $("<tr />")
        var item = items[0]
        for(var propertyName in propertiesToDisplay) {
          // if(propertiesToDisplay[propertyName]) {
            tr.append("<th>" + (this.aliases[propertyName] ? this.aliases[propertyName] : propertyName) + "</th>")
          // }
        }
        table.prepend($("<thead />").append(tr))
        
        return table[0].outerHTML ? table[0].outerHTML : "<table>" + table[0].innerHTML + "</table>"
      }
    },
    registerDisplayNames: function(aliases) {
      this.aliases=aliases
    },
    onProperty: function(name, callback) {
      var hook = {}
      hook[name] = callback
      this.propertyHooks.push(hook)
    },
    onObject: function(callback) {
      this.objectHooks.push(callback)
    },
    display: function(properties) {
      this.displayedProperties = properties;
    }
  }

  var applyObjectHooks = function(item, tr) {
    for(var j=0;j<this.objectHooks.length;j++) {
      if(tr) {
        tr = this.objectHooks[j](item, tr[0])
      }
    }
    return tr
  }

  var applyPropertyHooks = function(name, value, elem) {
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
