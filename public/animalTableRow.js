(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['animalTableRow'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<tr class=\"table-entry\">\r\n    <th>"
    + alias4(((helper = (helper = lookupProperty(helpers,"animalID") || (depth0 != null ? lookupProperty(depth0,"animalID") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"animalID","hash":{},"data":data,"loc":{"start":{"line":2,"column":8},"end":{"line":2,"column":20}}}) : helper)))
    + "</th>\r\n    <th>"
    + alias4(((helper = (helper = lookupProperty(helpers,"species") || (depth0 != null ? lookupProperty(depth0,"species") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"species","hash":{},"data":data,"loc":{"start":{"line":3,"column":8},"end":{"line":3,"column":19}}}) : helper)))
    + "</th>\r\n    <th>"
    + alias4(((helper = (helper = lookupProperty(helpers,"breed") || (depth0 != null ? lookupProperty(depth0,"breed") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"breed","hash":{},"data":data,"loc":{"start":{"line":4,"column":8},"end":{"line":4,"column":17}}}) : helper)))
    + "</th>\r\n    <th>"
    + alias4(((helper = (helper = lookupProperty(helpers,"animalName") || (depth0 != null ? lookupProperty(depth0,"animalName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"animalName","hash":{},"data":data,"loc":{"start":{"line":5,"column":8},"end":{"line":5,"column":22}}}) : helper)))
    + "</th>\r\n    <th>"
    + alias4(((helper = (helper = lookupProperty(helpers,"age") || (depth0 != null ? lookupProperty(depth0,"age") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"age","hash":{},"data":data,"loc":{"start":{"line":6,"column":8},"end":{"line":6,"column":15}}}) : helper)))
    + "</th>\r\n    <th>"
    + alias4(((helper = (helper = lookupProperty(helpers,"gender") || (depth0 != null ? lookupProperty(depth0,"gender") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"gender","hash":{},"data":data,"loc":{"start":{"line":7,"column":8},"end":{"line":7,"column":18}}}) : helper)))
    + "</th>\r\n    <th>"
    + alias4(((helper = (helper = lookupProperty(helpers,"adoptabilityScore") || (depth0 != null ? lookupProperty(depth0,"adoptabilityScore") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"adoptabilityScore","hash":{},"data":data,"loc":{"start":{"line":8,"column":8},"end":{"line":8,"column":28}}}) : helper)))
    + "</th>\r\n    <th class=\"hidden\"><a href="
    + alias4(((helper = (helper = lookupProperty(helpers,"pictureURL") || (depth0 != null ? lookupProperty(depth0,"pictureURL") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"pictureURL","hash":{},"data":data,"loc":{"start":{"line":9,"column":31},"end":{"line":9,"column":45}}}) : helper)))
    + "></a></th>\r\n</tr>";
},"useData":true});
})();
