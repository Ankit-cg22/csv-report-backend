var xlsx = require("xlsx");

function generateData(file){
    var workbook = xlsx.readFile(file)

    let worksheet = workbook.Sheets[workbook.SheetNames[0]]
    const params = worksheet['!ref'];
    const colLim = params[3].charCodeAt(0);
    const rowLim = parseInt(params.substring(4))
    let data = []
    let headings = [];
    let cars = 0 , bikes = 0 ,autos=0, totalVehicles= 0 , unbilled=0 , totalCollection=0 ,cash= 0 , digital = 0 ;

    for (j = 65; j <=colLim; j++) {
        let row = String.fromCharCode(j);
        headings.push(worksheet[`${row}1`]?.v)
    }
    for(let i = 2 ; i<=rowLim ; i++)
    {
        let sub ={}
        for (j = 65; j <=colLim; j++) {
            let row = String.fromCharCode(j);
            let property = worksheet[`${row}1`]?.v , value =worksheet[`${row}${i}`]?.v ; 
            if(property == 'IN Time' || property == 'Expected OUT Time' || property == 'Total Time (in hrs)'  )
            {
                value= value.toFixed(2)
            }
            if(property === 'Vehicle Type')
            {
                if(value === 'Bike')bikes++;
                else if(value === 'Car')cars++;
                else if(value === 'Auto')autos++;
            }
            sub[property] = value;
        }
        data.push(sub);
    }
    totalVehicles = cars + bikes + autos
    unbilled = totalVehicles
    data.map(obj => {
        if(obj['Payment Method'] !== undefined)unbilled--;
        if(obj['Payment Method'] === 'CashPayment')cash += obj['Total']
        if(obj['Payment Method'] === 'DigitalPayment')digital += obj['Total']
    })
    totalCollection = cash + digital

    const summary = {bikes , cars , autos , totalVehicles  , unbilled , cash , digital , totalCollection}
    
    const metaData = {tableData :{headings , data} ,summary }
    return metaData
}

module.exports= generateData