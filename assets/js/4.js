;(function() {
  // HTML Elements
  var wordInput = document.querySelector("#word-input");
  var optionsList = document.querySelector("#options-list");

  // Functions
  function getId() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
                 .toString(16)
                 .substring(1);
    };

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  };

  // Get Data
  var data = (function() {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", "/data/4.json", false);
    xhr.send();

    return JSON.parse(xhr.responseText);
  })();

  // Insert Elements
  var elements = [];

  for (var i = 0, len = data.length; i < len; i++) {
    (function(el) {
      if (!el.word) {
        return;
      };

      var li = document.createElement("li");
      var id = getId();

      li.id = id;
      li.innerHTML = el.word;

      if (el.hint) {
        var p = document.createElement("p");
        p.innerHTML = el.hint;

        li.appendChild(p);
        li.setAttribute("data-has-hint", "");

        li.addEventListener("click", function() {
          if (li.getAttribute("data-state") === "selected") {
            li.setAttribute("data-state", "");
          } else {
            li.setAttribute("data-state", "selected");
          };
        });
      };

      optionsList.appendChild(li);

      elements.push({
        "id": id,
        "el": li
      });
    })(data[i]);
  };

  // Search
  wordInput.addEventListener("keyup", function(e) {
    var text = wordInput.value.trim().toLowerCase();
    var rexp = new RegExp(text);

    for (var i = elements.length - 1; i >= 0; i--) {
      (function(object) {
        var text = object.el.innerText.toLowerCase();

        if (rexp.test(text)) {
          object.el.setAttribute("data-state", "");
        } else {
          object.el.setAttribute("data-state", "hided");
        };
      })(elements[i]);
    };
  });
})();