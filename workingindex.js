const lineReader = require('line-reader');
const LineReaderSync = require("line-reader-sync");

async function link_student_id(email_ID) {
    //console.log("Student Email ID: "+email_ID);
    lineReader.eachLine('student_id_email.csv', async function(line) {
        email_ID_file=line.split(',')[1];
        student_id=line.split(',')[0];
            if(email_ID == email_ID_file){
                 var total = await student_find_activities(student_id);
                 console.log(total);
                 return total;
                }

                //return total = await student_find_activities(student_id).then();
                
        })
}

function days_worked(stu_timestamps_people_id,student_ID,total_days) {
    days=[];
    stu_timestamp_people_id=stu_timestamps_people_id.split("*&*");
    stu_timestamp_people_id.forEach(element => {
        stu_ID=element.split('/')[1];
        timestamp_single=element.split('/')[0];
        if(stu_ID == student_ID) {
            date=timestamp_single.split('T')[0];
            days.push(date);
        }
    });
    var days_set=new Set(days);
    //console.log("Days worked: "+days_set.size);
    let days_set_array = [];
    days_set.forEach(v => days_set_array.push(v));
    //console.log("Dates: "+days_set_array);
    total_days=total_days+days_set.size;
    days_set_array.push(total_days)
    return days_set_array;
}


function student_find_activities(student_ID) {
    var total_days=0;
    var array = []
    var data_p_array = []
    //console.log("Student ID: "+student_ID+'\n');
    
    var lrs=new LineReaderSync("drive_activitiy_files.txt")
    while(true){
            var line = lrs.readline();
            
            if(line === null){
                break;
            }
            else{
                var stu_doc_id=line.split('***')[0];
                var stu_email_id=line.split('***')[1];
                var stu_doc_name=line.split('***')[2];
                var stu_timestamps_people_id=line.split('***')[3];
                if(line.includes(student_ID)) {
                    array.push(stu_doc_name)
                    //console.log(stu_doc_name);
                    data_p_array.push(days_worked(stu_timestamps_people_id,student_ID,total_days));
                    //console.log("Total days worked: "+total_days+'\n');
                }
            }

    }
    data_p_array.push(array)
    return data_p_array

}
module.exports = { lk:link_student_id, sfa : student_find_activities, dw : days_worked};
//module.exports = {total}

