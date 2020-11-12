/* 
    File: /domenic_ruocco_hw6/js/script.js
    Assignment: HW5
    Domenic Ruocco, UML Comp Sci, druocco@cs.uml.edu
    Course: 91.61 GUI Programming I
    Copyright (c) 2020 by Domenic Ruocco. All rights reserved.
*/

//Added new rules for checking if numbers are correct
jQuery.validator.addMethod("lessthan", function(value, element, tester) {
    return this.optional(element) || Number(value) <= Number($(tester).val());
});

jQuery.validator.addMethod("greaterthan", function(value, element, tester) {
    return this.optional(element) || Number(value) >= Number($(tester).val());
});

//jQuery Validator functions
$("#InputForm").validate({
    rules: {
        MinCol: {
            required: true,
            lessthan: "#MaxCol"
        },
        MaxCol: {
            required: true,
            greaterthan: "#MinCol"
        },
        MinRow: {
            required: true,
            lessthan: "#MaxRow"
        },
        MaxRow: {
            required: true,
            greaterthan: "#MinRow"
        }
    },
    messages: {
        MinCol: {
            required: "Please enter a valid number.",
            lessthan: "Number entered is too big."
        },
        MaxCol:  {
            required: "Please enter a valid number.",
            greaterthan: "Number entered is too small."
        },
        MinRow:  {
            required: "Please enter a valid number.",
            lessthan: "Number entered is too big."
        },
        MaxRow:  {
            required: "Please enter a valid number.",
            greaterthan: "Number entered is too small."
        },
    }
});

function genTable(MinCol, MaxCol, MinRow, MaxRow){
    
    if ($("#InputForm").valid()){

        //Clear old table
        var tab = document.getElementById("MultTable");
        while(tab.hasChildNodes()){
            tab.removeChild(tab.firstChild);
        }

        //Create Rows Header
        var rowHeader = document.createElement("tr");
        rowHeader.appendChild(document.createElement("td"));
        rowHeader.firstChild.id = "test";
        for(var i = MinCol; i <= MaxCol; i++){
            var HeaderBox = document.createElement("td");
            HeaderBox.id = "Header";
            var HeaderNum = document.createTextNode(i);
            HeaderBox.appendChild(HeaderNum);
            rowHeader.appendChild(HeaderBox);
        }
        tab.appendChild(rowHeader);

        //Make Table
        for(var i = MinRow ; i <= MaxRow; i++ ){
            var row = document.createElement("tr");
            var HeaderBox = document.createElement("td");
            HeaderBox.id = "Header";
            var HeaderNum = document.createTextNode(i);
            HeaderBox.appendChild(HeaderNum);
            row.appendChild(HeaderBox);
            //Make Columns
            for( var j = MinCol; j <= MaxCol; j++ ){
                var box = document.createElement("td");
                var num = document.createTextNode(i*j);
                box.appendChild(num);
                row.appendChild(box);
            }
            tab.appendChild(row);
        }
    }
}

genTable(1,10,1,10);

//Adapted to jQuery
$("#Submit").click(function(){
    genTable(Number($("#MinCol").val()), Number($("#MaxCol").val()), Number($("#MinRow").val()), Number($("#MaxRow").val()));
});

$("#InputForm").keyup(function(){
    $("#InputForm").valid();
});
