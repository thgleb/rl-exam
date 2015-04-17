;(function() {
  var rulesList = document.querySelector("#rules");
  var optionsList = document.querySelector("#options-list");
  var elements, eLen;

  var data = (function() {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", "/data/8.json", false);
    xhr.send();

    return JSON.parse(xhr.responseText);
  })();

  // Insert Types
  rulesList.innerHTML = (function() {
    var html = "";

    for (var i = 0, len = data.types.length; i < len; i++) {
      html += "<option value='" + i + "'>";
      html += data.types[i];
      html += "</option>";
    };

    return html;
  })();

  // Insert Elements
  optionsList.innerHTML = (function(els) {
    var html = "";

    for (var i = 0, len = els.length; i < len; i++) {
      html += "<li data-type='" + els[i].type + "'";
      html += "data-has-hint data-state='selected'>";

      html += data.types[els[i].type];

      if (els[i].roots) {
        html += "<ul>";

        for (var k = els[i].roots.length - 1; k >= 0; k--) {
          html += "<li>" + els[i].roots[k] + "</li>";
        };

        html += "</ul>";
      };

      if (els[i].rules) {
        html += "<p><b>Правила</b>:</p>";

        for (var k = 0; k < els[i].rules.length; k++) {
          if (els[i].rules[k] === "") {
            html += "<br>";
            continue;
          };

          html += "<p>— " + els[i].rules[k] + "</p>";
        };
      };

      if (els[i].exceptions) {
        html += "<p><b>Исключения</b>:</p>";

        for (var k = els[i].exceptions.length - 1; k >= 0; k--) {
          if (els[i].exceptions[k] === "") {
            html += "<br>";
            continue;
          };

          html += "<p>— " + els[i].exceptions[k] + "</p>";
        };
      };

      html += "</li>";
    };

    return html;
  })(data.data);

  elements = optionsList.children;
  eLen = elements.length;

  // Filter
  rulesList.addEventListener("change", function() {
    var id = parseInt(rulesList.value);

    for (var i = 0; i < eLen; i++) {
      if (id === 0) {
        elements[i].setAttribute("data-state", "selected");
      } else {
        var type = parseInt(elements[i].getAttribute("data-type"));

        if (id === type) {
          elements[i].setAttribute("data-state", "selected");
        } else {
          elements[i].setAttribute("data-state", "hided");
        };
      };
    };
  });
})();