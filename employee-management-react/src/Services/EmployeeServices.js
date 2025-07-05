import axios from "axios";

const baseURL='http://localhost:8080/api/employees' ;

export const listEmployees= () =>axios.get(baseURL);

export const createEmployee= (employee) =>axios.post(baseURL,employee);

export const getEmployee=(employeeId) => axios.get(baseURL+'/'+employeeId);

export const updateEmployee= (employeeId,employee)=> axios.put(baseURL+'/'+employeeId, employee);

export const deleteEmployee=(employeeId) => axios.delete(baseURL+'/'+employeeId);


