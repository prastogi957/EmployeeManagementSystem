
//POST

function postPersonalDetails(req){
    return "insert into personal_details (employee_id,first_name,last_name,dob,gender,aadhar_number,contact_number,address,email_id,blood_group,emp_images,update_date_time,editor_name) values ("+req.body.employee_id+",'"+req.body.first_name+"','"+req.body.last_name+"','"+req.body.dob+"','"+req.body.gender+"',"+req.body.aadhar_number+","+req.body.contact_number+",'"+req.body.address+"','"+req.body.email_id+"','"+req.body.blood_group+"','"+req.body.emp_images+"',NOW(),'"+req.body.editor_name+"');"

    }

function postFinancialRecordsDetails(req){
    return "insert into financial_records (employee_id,pan_number,bank_acc_number,ifsc_code,update_date_time,editor_name,account_type,bank_address) values ("+req.body.employee_id+",'"+req.body.pan_number+"','"+req.body.bank_acc_number+"','"+req.body.ifsc_code+"',NOW(),'"+req.body.editor_name+"','"+req.body.account_type+"','"+req.body.bank_address+"')";
}

function postEmployeeManualDetails(req){
    return "insert into employee_manual (employee_id,join_date,work_dept,company_policy,update_date_time,editor_name) values ("+req.body.employee_id+",'"+req.body.join_date+"','"+req.body.work_dept+"','"+req.body.company_policy+"',NOW(),'"+req.body.editor_name+"');"
}

function postSalarySlipsDetails(req){
    return "insert into view_sal_slips (employee_id,sal_slip_img,update_date_time,editor_name) values ("+req.body.employee_id+",'"+req.body.sal_slip_img+"',NOW(),'"+req.body.editor_name+"')"
}

function postTaxCalculationDetails(req){
    return "insert into tax_calculation values ("+req.body.employee_id+",'"+req.body.pan_number+"',"+req.body.aadhar_number+",'"+req.body.bank_acc_number+"',NOW(),'"+req.body.editor_name+"','"+req.body.tax_slip_img+"')"
}

function postInvestmentDeclarationDetails(req){
    return "insert into investment_declaration values("+req.body.employee_id+",'"+req.body.update_date_time+"','"+req.body.editor_name+"','"+req.body.forms_img+"','"+req.body.forms_img+"','"+req.body.total_investment+"')"
}

function postLeaveApplicationEmployeeDetails(req){
    return " insert into leave_application_employee (employee_id,date_of_leave,date_of_return,update_date_time,editor_name) values ("+req.body.employee_id+",'"+req.body.date_of_leave+"','"+req.body.date_of_return+"',NOW(),'"+req.body.editor_name+"')"
}

function postLeaveApplicationAdminDetails(req,date_leave,date_return){
    return "insert into leave_application_admin  values ("+req.body.employee_id+","+req.body.leave_id+",'"+date_leave+"','"+date_return+"',"+req.body.final_approval+",NOW(),'"+req.body.editor_name+"')"
}


function postInvestmentDeclarationDetails(req){
    return "insert into investment_declaration values("+req.body.employee_id+",NOW(),'"+req.body.editor_name+"','"+req.body.forms_img+"','"+req.body.total_investment+"')";
}

function postLeaveLeftEmployeeDetails(req){
    return "insert into leave_left_employee values ("+req.body.employee_id+","+req.body.sick_leave+","+req.body.paid_leave+")"
}


//PUT

function putLeaveAssignerDetails(req,add_leaves){
    return "update leave_left_employee set paid_leave="+add_leaves+" where employee_id="+req.body.employee_id;
}



function putLeaveDeductionDetails(req,currentNumberOfLeaves){
    return "update leave_left_employee set paid_leave="+currentNumberOfLeaves+" where employee_id="+req.body.employee_id;
}



//GET
 
function getPersonalDetails(req){
    return "select * from personal_details where employee_id="+req.body.employee_id;
}
 

function getFinancialRecordsDetails(req){
    return "select * from financial_records f,personal_details p where p.employee_id=f.employee_id and p.employee_id="+req.body.employee_id;
}

function getEmployeeManualDetails(req){
    return "select * from employee_manual e,personal_details p where p.employee_id=e.employee_id and p.employee_id="+req.body.employee_id;
}


function getLeaveApplicationSummaryDetails(){
    return " select p.employee_id,lle.sick_leave,lle.paid_leave,le.leave_id,le.date_of_leave,le.date_of_return,la.final_approval from leave_application_employee le,leave_application_admin la,personal_details p,leave_left_employee lle where p.employee_id=le.employee_id and le.employee_id=la.employee_id and p.employee_id=lle.employee_id;";
}

function getInvestmentDeclarationDetails(req){
    return "select * from investment_declaration where employee_id="+req.body.employee_id;
}

function getSalarySlipsDetails(req){
    return "select * from view_sal_slips where employee_id="+req.body.employee_id;
}

function getLeavesLeftDetails(req){
    return "select paid_leave from leave_left_employee where employee_id="+req.body.employee_id;
}

function getDateFromLeaveApplicationEmployeeDetails(req){
    return "select date_of_leave,date_of_return from leave_application_employee where leave_id="+req.body.leave_id;
}

function getTaxcalculationDetails(req){
    return "select * from tax_calculations where employee_id="+req.body.employee_id;
}

module.exports={getPersonalDetails,getFinancialRecordsDetails,getEmployeeManualDetails,postFinancialRecordsDetails,postEmployeeManualDetails,postSalarySlipsDetails,postTaxCalculationDetails,postLeaveApplicationEmployeeDetails,
    postPersonalDetails,getInvestmentDeclarationDetails,postInvestmentDeclarationDetails,postLeaveApplicationAdminDetails,getLeaveApplicationSummaryDetails,putLeaveDeductionDetails,getSalarySlipsDetails,getLeavesLeftDetails,postLeaveLeftEmployeeDetails,postLeaveLeftEmployeeDetails,putLeaveAssignerDetails,getDateFromLeaveApplicationEmployeeDetails,getTaxcalculationDetails};

