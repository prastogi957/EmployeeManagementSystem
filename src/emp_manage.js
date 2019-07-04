var mysql=require('Mysql');
var express=require('express');
var app=express();
var details=require("./sqlQueries");
var bodyparser=require("body-parser");
var DateDiff=require("date-diff");

app.use(bodyparser.urlencoded({extended : false}));
app.use(bodyparser.json());

var con=mysql.createConnection(
    {
        host:"localhost",
        user:"root",
        password:"1234",
        database:"EmployeeManagement",
        dateStrings: true
    });

con.connect(function(err){
    if(err) throw err;
    console.log("Connected");
    app.post("/postAllDetails",function(req,res,next){
        let postPersonalDetailsQuery=details.postPersonalDetails(req);
        let postFinancialRecordsQuery=details.postFinancialRecordsDetails(req);
        let postEmployeeManualQuery=details.postEmployeeManualDetails(req);
        let postLeaveLeftEmployeeQuery=details.postLeaveLeftEmployeeDetails(req);
        con.query(postPersonalDetailsQuery,function(err,result,field){
            if(err) throw err;
            con.query(postFinancialRecordsQuery,function(err,result,field){
                if(err) throw err;
                con.query(postEmployeeManualQuery,function(err,result,field){
                    if(err) throw err;
                    con.query(postLeaveLeftEmployeeQuery,function(err,result,field){
                        if(err) throw err;
                        res.send("1 Employee Successfully inserted");
                    });
                });
            });
        });
    });

    function leavesCalculator( date_of_return,date_of_leave)
    {
        let date_return = new Date(date_of_return);
        let date_leave = new Date(date_of_leave);
        let diff=new DateDiff(date_return,date_leave);
        return(diff.days());

    }
    
    app.post("/postLeaveInformation",function(req,res,next)
    {
        if(err) throw err;
        let postLeaveApplicationEmployeeQuery=details.postLeaveApplicationEmployeeDetails(req);
    
            con.query(postLeaveApplicationEmployeeQuery,function(err,result,field){
                if(err) throw err;
                    res.send("Successfully Inserted and Updated");
             })

    });
                
    app.post("/postLeaveInformationAdmin",function(req,res,next)
    {
        if(err) throw err;
        let currentNumberOfLeaves;
        let  getLeavesLeftQuery=details.getLeavesLeftDetails(req);
        let getDateFromLeaveApplicationEmployeeQuery=details.getDateFromLeaveApplicationEmployeeDetails(req);

        con.query(getLeavesLeftQuery,function(err,result,field){
            if(err) throw err;
            currentNumberOfLeaves=result[0].paid_leave;
            console.log(currentNumberOfLeaves);

            con.query(getDateFromLeaveApplicationEmployeeQuery,function(err,result,field){
             if(err) throw err;
                console.log(result);
                date_leave=result[0].date_of_leave;
                date_return=result[0].date_of_return;
                let differenceOfDates=leavesCalculator(date_return,date_leave);
                console.log(differenceOfDates);
                console.log(date_leave);
                console.log(date_return);

                let postLeaveApplicationAdminQuery=details.postLeaveApplicationAdminDetails(req,result[0].date_of_leave,result[0].date_of_return);
                con.query(postLeaveApplicationAdminQuery,function(err,result,field){
                    if(err) throw err;
                        console.log("Leave application to admin inserted");
            
                    if(req.body.final_approval===1){
                        currentNumberOfLeaves = currentNumberOfLeaves - differenceOfDates;
                        console.log(currentNumberOfLeaves);

                        let putLeaveDeductionQuery=details.putLeaveDeductionDetails(req,currentNumberOfLeaves);
                        con.query(putLeaveDeductionQuery,function(err,result,field){
                          if(err) throw err;
                            console.log(currentNumberOfLeaves);
                            res.send("Successfully Approved and Updated");
               
                        });
                    }
                 else{
                     res.send("Leave not approved")
                     }
                });

            });
        });
    });

    app.post("/postSalarySlips",function(req,res,next){
        let postSalarySlipsQuery=details.postSalarySlipsDetails(req)
        con.query(postSalarySlipsQuery,function(err,result,field){
            if(err) throw err;
            res.send("Salary Slip succesfully posted");
        });
    });

    app.post("/postInvestmentDeclaration",function(req,res,next){
        let postInvestmentDeclarationQuery=details.postInvestmentDeclarationDetails(req);
        con.query(postInvestmentDeclarationQuery,function(err,result,field){
            if(err) throw err;
            res.send("Investment declaration succesfully posted");
        });
    });
    //PUT

    app.put("/putLeaveAssigner",function(req,res,next){
        let currentNumberOfLeaves;
        let  getLeavesLeftQuery=details.getLeavesLeftDetails(req);
       con.query(getLeavesLeftQuery,function(err,result,field){
            if(err) throw err;
            currentNumberOfLeaves=result[0].paid_leave;
            console.log(currentNumberOfLeaves);

        let add_leaves=currentNumberOfLeaves+10;

        let putLeaveAssignerQuery=details.putLeaveAssignerDetails(req,add_leaves);
        con.query(putLeaveAssignerQuery,function(err,result,next){
            if(err) throw err;
            res.send("Number of leaves succesfully updated");
        })
    })
})



    //GET

    app.get("/getPersonalDetails",function(req,res,next){
        let getPersonalDetailsQuery=details.getPersonalDetails(req);
        con.query(getPersonalDetailsQuery,function(err,result,field){
            res.send(result);
        });
    });

    app.get("/getFinancialRecords",function(req,res,next){
        let getFinancialRecordsQuery=details.getFinancialRecordsDetails(req);
        con.query(getFinancialRecordsQuery,function(err,result,field){
            res.send(result);
        });
    });

    app.get("/getEmployeeManual",function(req,res,next){
        let getEmployeeManualQuery=details.getEmployeeManualDetails(req);
        con.query(getEmployeeManualQuery,function(err,result,field){
            res.send(result);
        });
    });

    app.get("/getLeaveApplication",function(req,res,next){
        let getLeaveApplicationSummaryQuery=details.getLeaveApplicationSummaryDetails(req);
        con.query(getLeaveApplicationSummaryQuery,function(err,result,field){
            res.send(result);
        });
    });

    app.get("/getInvestmentDeclaration",function(req,res,next){
        let getInvestmentDeclarationQuery=details.getInvestmentDeclarationDetails(req);
        con.query(getInvestmentDeclarationQuery,function(err,result,field)
        {
            res.send(result);
        })
    })

    app.get("/getSalarySlips",function(req,res,next){
        let getSalarySlipsQuery=details.getSalarySlipsDetails(req);
        con.query(getSalarySlipsQuery,function(err,result,field){
            res.send(result);
        })
    })

    app.get("/getTaxCalculation",function(req,res,next){
        let getTaxCalculationQuery=details.getTaxCalculationDetails(req);
        con.query(getTaxCalculationQuery,function(err,result,field){
            res.send(result);
        })
    })
    
});
app.listen(8888,function(){
    console.log("Server running at 8888");
})



