//
// Copyright (c) 2011 Frank Kohlhepp
// https://github.com/frankkohlhepp/fancy-settings
// License: LGPL v2.1
//
(function () {
    var settings,
        Bundle;

    function fillInLabel (params) {
        // HACK: If the label is an i18n object, look up our name in it to get
        //  the appropriate label
        if (
            params.label && 
            params.label.get
        ) {
            params.label = params.label.get(params.name);
        }
    };
    
    settings = new Store("settings");
    Bundle = new Class({
        // Attributes:
        // - tab
        // - group
        // - name
        // - type
        //
        // Methods:
        //  - initialize
        //  - createDOM
        //  - setupDOM
        //  - addEvents
        //  - get
        //  - set
        "Implements": Events,
        
        "initialize": function (params) {
            this.params = params;
            this.params.searchString = "•" + this.params.tab + "•" + this.params.group + "•";

            fillInLabel(this.params);

            this.createDOM();
            this.setupDOM();
            this.addEvents();
            
            if (this.params.id !== undefined) {
                this.element.set("id", this.params.id);
            }
            
            if (this.params.name !== undefined) {
                this.set(settings.get(this.params.name), true);
            }

            this.params.searchString = this.params.searchString.toLowerCase();
        },
        
        "addEvents": function () {
            this.element.addEvent("change", (function (event) {
                if (this.params.name !== undefined) {
                    settings.set(this.params.name, this.get());
                }
                
                this.fireEvent("action", this.get());
            }).bind(this));
        },
        
        "get": function () {
            return this.element.get("value");
        },
        
        "set": function (value, noChangeEvent) {
            this.element.set("value", value);
            
            if (noChangeEvent !== true) {
                this.element.fireEvent("change");
            }
            
            return this;
        }
    });
    
    Bundle.Description = new Class({
        // text
        "Extends": Bundle,
        "addEvents": undefined,
        "get": undefined,
        "set": undefined,
        
        "initialize": function (params) {
            this.params = params;
            this.params.searchString = "";
            
            fillInLabel(this.params);

            this.createDOM();
            this.setupDOM();
        },
        
        "createDOM": function () {
            this.bundle = new Element("div", {
                "class": "setting bundle description"
            });
            
            this.container = new Element("div", {
                "class": "setting container description"
            });
            
            this.element = new Element("p", {
                "class": "setting element description"
            });
        },
        
        "setupDOM": function () {
            if (this.params.text !== undefined) {
                this.element.set("html", this.params.text);
            }
            
            this.element.inject(this.container);
            this.container.inject(this.bundle);
        }
    });
    
    Bundle.Button = new Class({
        // label, text
        // action -> click
        "Extends": Bundle,
        "get": undefined,
        "set": undefined,
        
        "initialize": function (params) {
            this.params = params;
            this.params.searchString = "•" + this.params.tab + "•" + this.params.group + "•";
            
            fillInLabel(this.params);

            this.createDOM();
            this.setupDOM();
            this.addEvents();

            if (this.params.id !== undefined) {
                this.element.set("id", this.params.id);
            }
            
            this.params.searchString = this.params.searchString.toLowerCase();
        },
        
        "createDOM": function () {
            this.bundle = new Element("div", {
                "class": "setting bundle button"
            });
            
            this.container = new Element("div", {
                "class": "setting container button"
            });
            
            this.element = new Element("input", {
                "class": "setting element button",
                "type": "button"
            });
            
            this.label = new Element("label", {
                "class": "setting label button"
            });
        },
        
        "setupDOM": function () {
            if (this.params.label !== undefined) {
                this.label.set("html", this.params.label);
                this.label.inject(this.container);
                this.params.searchString += this.params.label + "•";
            }
            
            if (this.params.text !== undefined) {
                this.element.set("value", this.params.text);
                this.params.searchString += this.params.text + "•";
            }
            
            this.element.inject(this.container);
            this.container.inject(this.bundle);
        },
        
        "addEvents": function () {
            this.element.addEvent("click", (function () {
                this.fireEvent("action");
            }).bind(this));
        }
    });
    
    Bundle.Text = new Class({
        // label, text, masked
        // action -> change & keyup
        "Extends": Bundle,
        
        "createDOM": function () {
            this.bundle = new Element("div", {
                "class": "setting bundle text"
            });
            
            this.container = new Element("div", {
                "class": "setting container text"
            });
            
            this.element = new Element("input", {
                "class": "setting element text",
                "type": "text"
            });
            
            this.label = new Element("label", {
                "class": "setting label text"
            });
        },
        
        "setupDOM": function () {
            if (this.params.label !== undefined) {
                this.label.set("html", this.params.label);
                this.label.inject(this.container);
                this.params.searchString += this.params.label + "•";
            }
            
            if (this.params.text !== undefined) {
                this.element.set("placeholder", this.params.text);
                this.params.searchString += this.params.text + "•";
            }
            
            if (this.params.masked === true) {
                this.element.set("type", "password");
                this.params.searchString += "password" + "•";
            }
            
            this.element.inject(this.container);
            this.container.inject(this.bundle);
        },
        
        "addEvents": function () {
            var change = (function (event) {
                if (this.params.name !== undefined) {
                    settings.set(this.params.name, this.get());
                }
                
                this.fireEvent("action", this.get());
            }).bind(this);
            
            this.element.addEvent("change", change);
            this.element.addEvent("keyup", change);
        }
    });
    
    Bundle.Checkbox = new Class({
        // label
        // action -> change
        "Extends": Bundle,
        
        "createDOM": function () {
            this.bundle = new Element("div", {
                "class": "setting bundle checkbox"
            });
            
            this.container = new Element("div", {
                "class": "setting container checkbox"
            });
            
            this.element = new Element("input", {
                "id": String.uniqueID(),
                "class": "setting element checkbox",
                "type": "checkbox",
                "value": "true"
            });
            
            this.label = new Element("label", {
                "class": "setting label checkbox",
                "for": this.element.get("id")
            });
        },
        
        "setupDOM": function () {
            this.element.inject(this.container);
            this.container.inject(this.bundle);
            
            if (this.params.label !== undefined) {
                this.label.set("html", this.params.label);
                this.label.inject(this.container);
                this.params.searchString += this.params.label + "•";
            }
        },
        
        "get": function () {
            return this.element.get("checked");
        },
        
        "set": function (value, noChangeEvent) {
            this.element.set("checked", value);
            
            if (noChangeEvent !== true) {
                this.element.fireEvent("change");
            }
            
            return this;
        }
    });
    
    Bundle.Slider = new Class({
        // label, max, min, step, display, displayModifier
        // action -> change
        "Extends": Bundle,
        
        "initialize": function (params) {
            this.params = params;
            this.params.searchString = "•" + this.params.tab + "•" + this.params.group + "•";
            
            fillInLabel(this.params);

            this.createDOM();
            this.setupDOM();
            this.addEvents();
            
            if (this.params.name !== undefined) {
                this.set((settings.get(this.params.name) || 0), true);
            } else {
                this.set(0, true);
            }
            
            this.params.searchString = this.params.searchString.toLowerCase();
        },
        
        "createDOM": function () {
            this.bundle = new Element("div", {
                "class": "setting bundle slider"
            });
            
            this.container = new Element("div", {
                "class": "setting container slider"
            });
            
            this.element = new Element("input", {
                "class": "setting element slider",
                "type": "range"
            });
            
            this.label = new Element("label", {
                "class": "setting label slider"
            });
            
            this.display = new Element("span", {
                "class": "setting display slider"
            });
        },
        
        "setupDOM": function () {
            if (this.params.label !== undefined) {
                this.label.set("html", this.params.label);
                this.label.inject(this.container);
                this.params.searchString += this.params.label + "•";
            }
            
            if (this.params.max !== undefined) {
                this.element.set("max", this.params.max);
            }
            
            if (this.params.min !== undefined) {
                this.element.set("min", this.params.min);
            }
            
            if (this.params.step !== undefined) {
                this.element.set("step", this.params.step);
            }
            
            this.element.inject(this.container);
            if (this.params.display !== false) {
                if (this.params.displayModifier !== undefined) {
                    this.display.set("text", this.params.displayModifier(0));
                } else {
                    this.display.set("text", 0);
                }
                this.display.inject(this.container);
            }
            this.container.inject(this.bundle);
        },
        
        "addEvents": function () {
            this.element.addEvent("input", (function (event) {
                if (this.params.name !== undefined) {
                    settings.set(this.params.name, this.get());
                }
                
                if (this.params.displayModifier !== undefined) {
                    this.display.set("text", this.params.displayModifier(this.get()));
                } else {
                    this.display.set("text", this.get());
                }
                this.fireEvent("action", this.get());
            }).bind(this));
        },
        
        "get": function () {
            return Number.from(this.element.get("value"));
        },
        
        "set": function (value, noChangeEvent) {
            this.element.set("value", value);
            
            if (noChangeEvent !== true) {
                this.element.fireEvent("change");
            } else {
                if (this.params.displayModifier !== undefined) {
                    this.display.set("text", this.params.displayModifier(Number.from(value)));
                } else {
                    this.display.set("text", Number.from(value));
                }
            }
            
            return this;
        }
    });
    
    Bundle.PopupButton = new Class({
        // label, options[{value, text}]
        // action -> change
        "Extends": Bundle,
        
        "createDOM": function () {
            this.bundle = new Element("div", {
                "class": "setting bundle popup-button"
            });
            
            this.container = new Element("div", {
                "class": "setting container popup-button"
            });
            
            this.element = new Element("select", {
                "class": "setting element popup-button"
            });
            
            this.label = new Element("label", {
                "class": "setting label popup-button"
            });
            
            if (this.params.options === undefined) { return; }

            // convert array syntax into object syntax for options
            function arrayToObject(option) {
                if (typeOf(option) == "array") {
                    option = {
                        "value": option[0],
                        "text": option[1] || option[0],
                    };
                }
                return option;
            }

            // convert arrays
            if (typeOf(this.params.options) == "array") {
                var values = [];
                this.params.options.each((function(values, option) {
                    values.push(arrayToObject(option));
                }).bind(this, values));
                this.params.options = { "values": values };
            }

            var groups;
            if (this.params.options.groups !== undefined) {
                groups = {};
                this.params.options.groups.each((function (groups, group) {
                    this.params.searchString += (group) + "•";
                    groups[group] = (new Element("optgroup", {
                        "label": group,
                    }).inject(this.element));
                }).bind(this, groups));
            }

            if (this.params.options.values !== undefined) {
                this.params.options.values.each((function(groups, option) {
                    option = arrayToObject(option);
                    this.params.searchString += (option.text || option.value) + "•";

                    // find the parent of this option - either a group or the main element
                    var parent;
                    if (option.group && this.params.options.groups) {
                        if ((option.group - 1) in this.params.options.groups) {
                            option.group = this.params.options.groups[option.group-1];
                        }
                        if (option.group in groups) {
                            parent = groups[option.group];
                        }
                        else {
                            parent = this.element;
                        }
                    }
                    else {
                        parent = this.element;
                    }

                    (new Element("option", {
                        "value": option.value,
                        "text": option.text || option.value,
                    })).inject(parent);
                }).bind(this, groups));
            }
        },
        
        "setupDOM": function () {
            if (this.params.label !== undefined) {
                this.label.set("html", this.params.label);
                this.label.inject(this.container);
                this.params.searchString += this.params.label + "•";
            }
            
            this.element.inject(this.container);
            this.container.inject(this.bundle);
        }
    });
    
    Bundle.ListBox = new Class({
        // label, options[{value, text}]
        // action -> change
        "Extends": Bundle.PopupButton,
        
        "createDOM": function () {
            this.bundle = new Element("div", {
                "class": "setting bundle list-box"
            });
            
            this.container = new Element("div", {
                "class": "setting container list-box"
            });
            
            this.element = new Element("select", {
                "class": "setting element list-box",
                "size": "2"
            });
            
            this.label = new Element("label", {
                "class": "setting label list-box"
            });
            
            if (this.params.options === undefined) { return; }
            this.params.options.each((function (option) {
                this.params.searchString += (option.text || option.value) + "•";
                
                (new Element("option", {
                    "value": option.value,
                    "text": option.text || option.value
                })).inject(this.element);
            }).bind(this));
        },
        
        "get": function () {
            return (this.element.get("value") || undefined);
        }
    });
    
    Bundle.Textarea = new Class({
        // label, text, value
        // action -> change & keyup
        "Extends": Bundle,
        
        "createDOM": function () {
            this.bundle = new Element("div", {
                "class": "setting bundle textarea"
            });
            
            this.container = new Element("div", {
                "class": "setting container textarea"
            });
            
            this.element = new Element("textarea", {
                "class": "setting element textarea"
            });
            
            this.label = new Element("label", {
                "class": "setting label textarea"
            });
        },
        
        "setupDOM": function () {
            if (this.params.label !== undefined) {
                this.label.set("html", this.params.label);
                this.label.inject(this.container);
                this.params.searchString += this.params.label + "•";
            }
            
            if (this.params.text !== undefined) {
                this.element.set("placeholder", this.params.text);
                this.params.searchString += this.params.text + "•";
            }

            if (this.params.value !== undefined) {
                this.element.appendText(this.params.text);
            }
            
            this.element.inject(this.container);
            this.container.inject(this.bundle);
        },
        
        "addEvents": function () {
            var change = (function (event) {
                if (this.params.name !== undefined) {
                    settings.set(this.params.name, this.get());
                }
                
                this.fireEvent("action", this.get());
            }).bind(this);
            
            this.element.addEvent("change", change);
            this.element.addEvent("keyup", change);
        }
    });

    Bundle.RadioButtons = new Class({
        // label, options[{value, text}]
        // action -> change
        "Extends": Bundle,
        
        "createDOM": function () {
            var settingID = String.uniqueID();
            
            this.bundle = new Element("div", {
                "class": "setting bundle radio-buttons"
            });
            
            this.label = new Element("label", {
                "class": "setting label radio-buttons"
            });
            
            this.containers = [];
            this.elements = [];
            this.labels = [];
            
            if (this.params.options === undefined) { return; }
            this.params.options.each((function (option) {
                var optionID,
                    container;
                
                this.params.searchString += (option.text || option.value) + "•";
                
                optionID = String.uniqueID();
                container = (new Element("div", {
                    "class": "setting container radio-buttons"
                })).inject(this.bundle);
                this.containers.push(container);
                
                this.elements.push((new Element("input", {
                    "id": optionID,
                    "name": settingID,
                    "class": "setting element radio-buttons",
                    "type": "radio",
                    "value": option.value
                })).inject(container));
                
                this.labels.push((new Element("label", {
                    "class": "setting element-label radio-buttons",
                    "for": optionID,
                    "text": option.text || option.value
                })).inject(container));
            }).bind(this));
        },
        
        "setupDOM": function () {
            if (this.params.label !== undefined) {
                this.label.set("html", this.params.label);
                this.label.inject(this.bundle, "top");
                this.params.searchString += this.params.label + "•";
            }
        },
        
        "addEvents": function () {
            this.bundle.addEvent("change", (function (event) {
                if (this.params.name !== undefined) {
                    settings.set(this.params.name, this.get());
                }
                
                this.fireEvent("action", this.get());
            }).bind(this));
        },
        
        "get": function () {
            var checkedEl = this.elements.filter((function (el) {
                return el.get("checked");
            }).bind(this));
            return (checkedEl[0] && checkedEl[0].get("value"));
        },
        
        "set": function (value, noChangeEvent) {
            var desiredEl = this.elements.filter((function (el) {
                return (el.get("value") === value);
            }).bind(this));
            desiredEl[0] && desiredEl[0].set("checked", true);
            
            if (noChangeEvent !== true) {
                this.bundle.fireEvent("change");
            }
            
            return this;
        }
    });
    
    Bundle.ImageFile = new Class({
        // label, file url or blob id
        // action -> change
        "Extends": Bundle,
        
        "createDOM": function () {
            this.bundle = new Element("div", {
                "class": "setting bundle imageFile"
            });
            
            this.container = new Element("div", {
                "class": "setting container imageFile"
            });

            this.resetButton = new Element("button", {
                "class": "setting resetButton imageFile",
                "text": "Reset"
            });
            
            this.element = new Element("input", {
                "class": "setting element imageFile",
                "type": "file",
                "accept": "image/*"
            });

            this.preview = new Element("img", {
                "class": "setting preview imageFile",
            });
            
            this.label = new Element("label", {
                "class": "setting label imageFile"
            });
        },
        
        "setupDOM": function () {
            if (this.params.label !== undefined) {
                this.label.set("html", this.params.label);
                this.label.inject(this.container);
                this.params.searchString += this.params.label + "•";
            }

            // I would do this using CSS but CSS can't do this! :-D
            (new Element("br", {})).inject(this.container);

            this.resetButton.inject(this.container);
            this.element.inject(this.container);
            (new Element("br", {})).inject(this.container);

            this.preview.inject(this.container);
            this.container.inject(this.bundle);
        },
        
        "addEvents": function () {
            var reset = (function (event) {
                console.log("File reset");

                settings.set(this.params.name, null);
                this.element.value = "";
                this.preview.set("src", chrome.extension.getURL(this.params.default));
            }).bind(this);

            var change = (function (event) {
                var files = event.target.files;
                if (!files.length)
                    return reset();

                var file = files[0];

                if (
                    this.params.maxSize &&
                    file.size > this.params.maxSize
                ) {
                    reset();
                    return alert("File must be " + (this.params.maxSize / 1024).toFixed(1) + "kb or smaller");
                }

                console.log("File changed", file);

                var blobUrl = window.URL.createObjectURL(file);
                var reader = new FileReader();
                reader.onload = (function () {
                    var array = new Uint8Array(reader.result);
                    var base64 = encoding.Base64.arrayToString(array);
                    settings.set(this.params.name, base64);
                    this.preview.set("src", blobUrl);
                }).bind(this);
                reader.readAsArrayBuffer(file);
            }).bind(this);

            this.resetButton.addEvent("click", reset);
            
            this.element.addEvent("change", change);
        },

        "set": function (value, noChangeEvent) {
            if (value) {
                try {
                    var imageUrl = encoding.Base64.stringToImageURL(value);
                    this.preview.set("src", imageUrl);
                    return;
                } catch (exc) {
                    console.log("Failed to decode saved image", exc);
                    settings.set(this.params.name, null);
                    this.set(null);
                }
            }

            this.preview.set("src", chrome.extension.getURL(this.params.default));
        }
    });
    
    Bundle.KeyBindingList = new Class({
        // action -> change
        "Extends": Bundle,
        
        "createDOM": function () {
            this.bundle = new Element("div", {
                "class": "setting bundle keyBindingList"
            });
            
            this.listBox = new Element("select", {
                "class": "setting listBox keyBindingList",
                "size": 2
            });
        },
        
        "setupDOM": function () {
            this.listBox.inject(this.bundle);
        },
        
        "addEvents": function () {
        },

        "set": function (value, noChangeEvent) {
            this.listBox.innerHTML = "";

            if (value)
                this.bindings = JSON.parse(value);
            else
                this.bindings = {};

            var sortedKeys = Object.keys(this.params.defaults);
            // sortedKeys.sort();

            var currentSection = null;

            for (var i = 0, l = sortedKeys.length; i < l; i++) {
                var key = sortedKeys[i];
                if (this.params.defaults[key] === "<SECTION>") {
                    currentSection = document.createElement("option");
                    currentSection.className = "groupHeader";
                    currentSection.setAttribute("disabled", "disabled");
                    currentSection.textContent = key;
                    this.listBox.appendChild(currentSection);
                    continue;
                }

                var bindings = this.bindings[key];
                if (!bindings)
                    bindings = this.params.defaults[key];
                if (!bindings)
                    bindings = [];

                if (typeof (bindings) === "string")
                    bindings = [bindings];

                for (var j = 0, l2 = bindings.length; j < l2; j++) {
                    var elt = document.createElement("option");
                    elt.textContent = key;
                    elt.setAttribute("binding", bindings[j]);
                    this.listBox.appendChild(elt);
                }
            }
        }
    });
    
    Bundle.UpdateWidget = new Class({
        "Extends": Bundle,
        
        "createDOM": function () {
            this.isRestartPending = false;

            this.bundle = new Element("div", {
                "class": "setting bundle updateWidget"
            });
            
            this.container = new Element("div", {
                "class": "setting container updateWidget"
            });

            this.extensionSpan = new Element("span", {
                id: "extensionVersion"
            });

            this.installerSpan = new Element("span", {
                id: "installerVersion"
            });

            this.restartExtensionButton = new Element("button", {
                id: "restartExtension", text: "Restart and update"
            });

            this.installLatestButton = new Element("button", {
                id: "installLatest", text: "Check for updates"
            });

            this.iframe = new Element("iframe");            
        },
        
        "setupDOM": function () {
            this.extensionSpan.inject(this.container);
            (new Element("br", {})).inject(this.container);
            this.installerSpan.inject(this.container);
            (new Element("br", {})).inject(this.container);
            this.restartExtensionButton.inject(this.container);
            this.installLatestButton.inject(this.container);

            this.refresh();

            this.container.inject(this.bundle);

            this.installLatestButton.addEventListener("click", this.installLatestVersion.bind(this));
            this.restartExtensionButton.addEventListener("click", this.restartExtension.bind(this));
        },

        "restartExtension": function () {
            this.extensionSpan.textContent = "Restarting extension...";
            window.setTimeout(function () {
                chrome.runtime.sendMessage({type: "reloadExtension", openAtStartupUrl: window.location.href});
            }, 500);
        },

        "installLatestVersion": function (evt) {
            console.log(evt);
            var self = this;

            status.textContent = "Downloading extension update...";

            self.restartExtensionButton.style.display = "none";
            self.installLatestButton.style.display = "none";

            sendInstallerCommand(evt.shiftKey ? "forceInstallUpdate" : "installUpdate", function (result, error) {
                var newVersion = result.installedVersion;

                self.installerSpan.textContent = "Checking for installer update...";
                console.log("Starting installer auto-update");
                sendInstallerCommand("autoUpdateInstaller", function (r, e) {
                    console.log("Installer auto-update finished", r, e);
                    if (r === true) {
                        self.installerSpan.textContent = "Updating installer...";
                        window.setTimeout(function () {
                            self.installerSpan.textContent = "Installer updated.";
                            self.refresh();
                        }, 10000);
                    } else {
                        self.installerSpan.textContent = "No installer update found.";
                    }
                });

                switch (result.result) {
                    case "Updated":
                        self.extensionSpan.textContent = "Update successful. Installed v" + newVersion;
                        self.restartExtensionButton.style.display = "";
                        self.isRestartPending = true;
                        return;
                    case "NotUpdated":
                        self.extensionSpan.textContent = "No update found.";
                        break;
                    default:
                        self.extensionSpan.textContent = "Update failed.";
                        break;
                }

                window.setTimeout(
                    self.refresh.bind(self), 1000 * 5
                );
            });
        },

        "refreshVersionText": function (installerVersion, installedVersion) {
            var status = this.statusSpan;

            var currentVersion = chrome.app.getDetails().version;
            var currentVersionText = "Viramate v" + currentVersion;
            this.extensionSpan.textContent = currentVersionText;

            if (installerVersion) {
                if (currentVersion !== installedVersion) {
                    this.extensionSpan.textContent += " (v " + installedVersion + " ready to install)";
                }

                this.installerSpan.textContent = "Installer v" + installerVersion;
            } else {
                this.installerSpan.textContent = "Installer not available";
            }

            return currentVersion;
        },

        "refresh": function () {
            var currentVersion = this.refreshVersionText(null);
            this.extensionSpan.textContent = "Checking current install...";
            this.installLatestButton.style.display = "none";
            this.restartExtensionButton.style.display = this.isRestartPending ? "" : "none";

            var self = this;
            sendInstallerCommand("getVersion", function (result, error) {
                if (result) {
                    self.refreshVersionText(result.installer, result.extension);
                    var isUpdateReady = (result.extension !== currentVersion);
                    var showUpdate = (self.isRestartPending || isUpdateReady);
                    self.restartExtensionButton.style.display = showUpdate ? "" : "none";
                    self.installLatestButton.style.display = !showUpdate ? "" : "none";
                } else {
                    status.textContent = "Installer broken or not available";
                }
            });
        },
        
        "addEvents": function () {
        },

        "set": function (value, noChangeEvent) {
        }
    });
    
    this.Setting = new Class({
        "initialize": function (container) {
            this.container = container;
        },
        
        "create": function (params) {
            var types,
                bundle;
            
            // Available types
            types = {
                "description": "Description",
                "button": "Button",
                "text": "Text",
                "textarea": "Textarea",
                "checkbox": "Checkbox",
                "slider": "Slider",
                "popupButton": "PopupButton",
                "listBox": "ListBox",
                "radioButtons": "RadioButtons",
                "imageFile": "ImageFile",
                "keyBindingList": "KeyBindingList",
                "updateWidget": "UpdateWidget"
            };
            
            if (types.hasOwnProperty(params.type)) {
                bundle = new Bundle[types[params.type]](params);
                bundle.bundleContainer = this.container;
                bundle.bundle.inject(this.container);
                return bundle;
            } else {
                throw "invalidType";
            }
        }
    });
}());
