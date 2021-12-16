const findAll = async (req, res) => {
    try {
        const result = await req.context.models.employees.findAll();
        return res.send(result);
    } catch (error) {
        return res.status(404).send("no data found");
    }
}

const findOne = async (req,res) => {
    try {
        const result = await req.context.models.employees.findOne({
            where:{employee_id:req.params.id}
        })
        return res.send(result)
    } catch (error) {
        return res.status(404).send("no data found")
    }
}

const create = async (req,res)=>{
    try {
        const result = await req.context.models.employees.create({
            first_name : req.body.first_name,
            last_name : req.body.last_name,
            email : req.body.email,
            phone_number : req.body.phone_number,
            hire_date : new Date(),
            job_id : req.body.job_id,
            salary : req.body.salary,
            manager_id : req.body.manager_id,
            department_id : req.body.department_id
        })
        return res.send(result)
    } catch (error) {
        return res.status(404).send("no data input")
    }
}

const update = async (req,res)=>{
    try {
        const result = await req.context.models.employees.update({
            first_name : req.body.first_name,
            last_name : req.body.last_name,
            email : req.body.email,
            phone_number : req.body.phone_number,
            hire_date : new Date(),
            job_id : req.body.job_id,
            salary : req.body.salary,
            manager_id : req.body.manager_id,
            department_id : req.body.department_id
        },{
            returning : true, where:{employee_id:req.params.id}
        })
        return res.send(result)
    } catch (error) {
        return res.status(404).send("no data update")
    }
}

const createFull = async (req, res)=>{
    const {files:{file}, fields} = req.fileAttrb
    try {
        const result = await req.context.models.employees.create({
            first_name : fields[0].value,
            last_name : fields[1].value,
            email : fields[2].value,
            phone_number :fields[3].value,
            hire_date : new Date(),
            job_id : parseInt(fields[4].value),
            salary : fields[5].value,
            manager_id : parseInt( fields[6].value),
            department_id : parseInt( fields[7].value),
            profile : file.newFilename
        })
        res.send(result)
    } catch (error) {
        return res.status(404).send("no data input")
    }
}

const deleteRow = async (req,res) => {
    try {
        const result = await req.context.models.employees.destroy({
            where:{employee_id: req.params.id}
        })
        res.send("delete" + result + "row")
    } catch (error) {
        return res.status(404).send("failed delete row")
    }
}
export default {
    findAll,
    findOne,
    create,
    update,
    createFull,
    deleteRow,
}