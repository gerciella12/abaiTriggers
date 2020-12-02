/**
 * Created 16.07.2020.
 */

import {LightningElement, track} from 'lwc';
import saveResultToBD from '@salesforce/apex/ExamCalculatorController.saveResult';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ExamCalculator extends LightningElement {
    salesforceFundamentals = 0;
    dataModelingAndManagement = 0;
    social = 0;
    userInterface = 0;
    salesforceFundamentals = 0;
    dataModelingAndManagement = 0;
    processAutomationAndLogic = 0;
    userInterface = 0;
    testingDebuggingAndDeployment = 0;
    result = 0;
    scoreRecordUrl = '';
    saveScore(event) {
        saveResultToBD({params : {'score' : this.result}})
            .then((result34) => {
                console.log(result34)

                const evt = new ShowToastEvent({
                    title: 'Success',
                    message: 'Score successfully saved',
                    variant: 'success',
                    mode: 'dismissable'
                });
                this.dispatchEvent(evt);

                this.scoreRecordUrl = '/' + result34.scoreId
                window.setTimeout(
                    () => {
                        window.open(this.scoreRecordUrl, '_blank');
                    },
                    1500
                )

            })
            .catch((error) => {
                this.message = 'Error received: code' + error.errorCode + ', ' +
                    'message ' + error.body.message;
            });
    }
    handleChanges(event){
        if (event.target.name === 'salesforceFundamentals') {
            this.salesforceFundamentals = event.target.value;
        }
        if (event.target.name === 'dataModelingAndManagement') {
            this.dataModelingAndManagement = event.target.value;
        }
        if (event.target.name === 'processAutomationAndLogic') {
            this.processAutomationAndLogic = event.target.value;
        }
        if (event.target.name === 'userInterface') {
            this.userInterface = event.target.value;
        }
        if (event.target.name === 'testingDebuggingAndDeployment') {
            this.testingDebuggingAndDeployment = event.target.value;
        }
        this.result = parseInt(parseInt(this.salesforceFundamentals * 7)/100 +
            parseInt(this.dataModelingAndManagement * 13) / 100 +
            parseInt(this.processAutomationAndLogic * 38) / 100 +
            parseInt(this.userInterface * 25) / 100 +
            parseInt(this.testingDebuggingAndDeployment * 17) / 100);
    }
}