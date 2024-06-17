import * as fs from 'fs'
import * as jsonDiff from 'json-diff'

export default class Reusable {

    public async createFile(data: CSSStyleDeclaration, fileName: string): Promise<number> {
        const jsonString = JSON.stringify(data);
        var r = 1;
        try {
            if (!fs.existsSync("cssDataJsonBaseLine/" + fileName)) {
                fs.writeFileSync("cssDataJsonBaseLine/" + fileName, jsonString);
                console.log('File write complete', "cssDataJsonBaseLine/" + fileName);
            } else {
                fs.writeFileSync("cssDataJson/" + fileName, jsonString);
                console.log('File write complete', "cssDataJson/" + fileName);
            }

        } catch (error) {
            console.error('Error Writting to file :', error)
            r = 0
        }
        return r;
    }
    public async compareJson(baseline: string, runtime: string): Promise<string> {
        const a = fs.readFileSync(baseline, { encoding: 'utf8' });
        const b = fs.readFileSync(runtime, { encoding: 'utf8' });
        var diff = "";
        try {
            const diff = (jsonDiff.diffString(JSON.parse(a), JSON.parse(b)));
            return (JSON.stringify(diff));
        }
        catch (err) {
            return "";
        }
    }

   
    // public async startReport(reportName:string,reportPath:string,testInfo:TestInfo){
    //     console.log(`Started ${testInfo.title}`);
    //     data.testcasename=testInfo.title;
    //     data.starttime= new Date().toLocaleTimeString('en-GB', { hour: "numeric", 
    //     minute: "numeric", day: "numeric", month :"2-digit",year: "numeric"});
    //     var newData2 = JSON.stringify(data);
    //     try{
    //         fs.writeFileSync("results/testreport.json", newData2);
    //     }catch(error){
    //         console.error("Error in LogReport:",error);
    //     } 


    // }
    // public async endReport(testInfo:TestInfo){
    //     console.log(`End reopt ${testInfo.title}`);      
    //     data.endtime= new Date().toLocaleTimeString('en-GB', { hour: "numeric", 
    //     minute: "numeric", day: "numeric", month :"2-digit",year: "numeric"});
    //     data.status=testInfo.status?.toString();
       
    //     var newData2 = JSON.stringify(data);
    //     try{
    //         fs.writeFileSync("results/testreport.json", newData2);
    //     }catch(error){
    //         console.error("Error in LogReport:",error);
    //     } 
    // }
    // public async LogReport(stepDescription:string,status:string,imgBase64:string){
    //     var currentdate = new Date();
    //     let newData = {
    //         description: stepDescription,
    //         status:status,
    //         time: currentdate.toDateString(),
    //         imagebase64:imgBase64
    //     };
    //     var arrayo= data.steps      
    //     arrayo.push(newData);
    //     console.log(arrayo);
    //     // Adding the new data to our object        
    //     var newData2 = JSON.stringify(data);
    //     try{
    //         fs.writeFileSync("results/testreport.json", newData2);
    //     }catch(error){
    //         console.error("Error in LogReport:",error);
    //     }     
    // }
}