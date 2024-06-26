/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "student/com/sap/training/ux402/listdetail/ux402listdetail/model/models",
        "student/com/sap/training/ux402/listdetail/ux402listdetail/controller/ListSelector"
    ],
    function (UIComponent, Device, models, ListSelector) {
        "use strict";

        return UIComponent.extend("student.com.sap.training.ux402.listdetail.ux402listdetail.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // To make sure that the ListSelector can be referenced from each part
                // of the application, we must create an instance of the ListSelector at
                // a more global level. Therefore, create an instance of the ListSelector
                // inside the Component.js file and make sure that the instance is a
                // member variable of the component.
                
                // instantiation of the listselector
                this.oListSelector = new ListSelector();

                // enable routing
                this.getRouter().initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device");
            }
        });
    }
);