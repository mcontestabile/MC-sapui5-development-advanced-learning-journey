sap.ui.define(
    [
        "student/com/sap/training/ux402/listdetail/ux402listdetail/controller/BaseController",
        "sap/ui/Device"
    ],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("student.com.sap.training.ux402.listdetail.ux402listdetail.controller.Detail", {
            // Implement the onInit function. Register the _onObjectMatched event handler for the pattern matching event of the carrierdetails route.
            onInit: function () {
                this.getRouter().getRoute("carrierdetails").attachPatternMatched(this._onObjectMatched, this);
            },

            // Define a function named _onBindingChange. The function should check whether the view is bound to
            // an entity or not. If not, a target with the name detailObjectNotFound should be displayed and the
            // selection on the master list should be cleared. To clear the selection, call the function clearListSelection
            // on the ListSelector. If the view is bound to an entity, get the binding path of the entity and
            // invoke the selectAListItem function from the ListSelector. Pass the binding path as an argument.
            _onBindingChange: function() {
			    var oView = this.getView();
			    var oElementBinding = oView.getElementBinding();
			    if (!oElementBinding.getBoundContext()) {
				    this.getRouter().getTargets().display("detailObjectNotFound");
				    this.getOwnerComponent().oListSelector.clearMasterListSelection();
				    return;
			    }
			    var sPath = oElementBinding.getPath();
			    this.getOwnerComponent().oListSelector.selectAListItem(sPath);
		    },
            
            // Implement a function named _bindView. The function takes one argument named sObjectPath.
            // The variable contains the path to the selected Object from the master list. Update the
            // binding of the view using the bindElement function. Pass a literal object to the bindElement
            // function. Add a property named path to the literal object and assign the sObjectPath variable
            // to the property. Then add an events property to the literal object. Assign another literal
            // object to the events property. Define three attributes to the events object. The first property
            // is called change. Assign the reference to the function _onBindingChangeto the property. Add a
            // property dataRequested and dataReceived. Assign a function to each property. Implement the function
            // for dataRequested and show that the view is busy. Implement the function for dataReceived and
            // hide the busy indicator for the view.         
            _bindView: function(sObjectPath) {
			    var oView = this.getView();

			    this.getView().bindElement({
				    path: sObjectPath,
				    events: {
					    change: this._onBindingChange.bind(this),
					    dataRequested: function() {
						    oView.setBusy(true);
					    },
					    dataReceived: function() {
						    oView.setBusy(false);
					    }
				    }
			    });
		    },

            // Implement a function named _onObjectMatched. This function is an event handler function for the
            // Pattern-Matched event during navigation. Read the navigation property objectId from the events
            // arguments and call the _bindView function of the controller. Pass the objectId to the function.
            // In addition, change the layout attribute of the mainView Model to TwoColumnsMidExpanded to adjust
            // the layout behavior of your sap.f.flexibleColumnLayout.     
            _onObjectMatched: function(oEvent) {
                this.getView().getModel("mainView").setProperty("/layout", "TwoColumnsMidExpanded");
			    var sObjectPath =
				    "/UX_C_Carrier_TP('" + oEvent.getParameter("arguments").objectId + "')";
			    this._bindView(sObjectPath);
		    }
        });
    });