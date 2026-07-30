import { Method } from "../../models/Method";
import { useState } from "react";
import { Parameter, parameterToString } from "../../models/Parameter";
import { buildTextField } from "../CustomComponents";
import { Button, Chip, Grid } from "@mui/material";
import ParamChip from "./ParamChip";

export default function MethodDetails(props: {method: Method, onRemove: (methodId: string) => void, onEdit: () => void}) {

    const [checked, setChecked] = useState(false);

    return (
        <div style={{
            padding: '12px',
            paddingTop: '0px',
            display: 'flex',
            width: '96%',
            alignItems: 'center',
            borderRadius: '5px',
            }}>
                <div style={{
                        //backgroundColor: 'red',
                        padding: '12px',
                        borderRadius: '5px',
                        margin: '8px',
                        marginRight: '8px',
                        display: 'flex',
                        width: '100%',
                        paddingTop: '20px',
                        border: '1px solid rgba(1, 1, 1, 0.5)'
                        // cursor: 'pointer'
                    }}
                    onClick={() => setChecked(!checked)}
                >
                    <div style={{width: '100%'}}>
                        <div style={{
                            // backgroundColor: 'lightblue',
                            // padding: '12px',
                            paddingRight: '0px',
                            paddingTop: '0px',
                            display: 'flex',
                            width: '100%',
                            alignItems: 'center',
                            borderRadius: '5px',
                        }}>
                            {buildTextField("Method", props.method.name, (v: any) => 1, true, true)}
                            <Button 
                                variant="outlined" 
                                color="info" 
                                disableElevation 
                                style={{width: '100px', marginRight: '8px', marginLeft: '8px', marginBottom: '9px'}} 
                                onClick={props.onEdit}>
                                Edit
                            </Button>
                            <Button 
                                variant="outlined" 
                                color="error" 
                                disableElevation 
                                style={{width: '100px', marginBottom: '9px'}} 
                                onClick={() => props.onRemove(props.method.identifier)}>
                                    Remove
                            </Button>
                        </div>
                        <Grid container spacing={1} style={{width: '101%', marginTop: '6px'}}>
                            <Grid item  style={{width: '60%'}}>
                                {buildTextField("Class", props.method.className, (v: any) => 1, true, true)}
                            </Grid>
                            <Grid item style={{width: '40%'}}>
                                {buildTextField("Return type", props.method.returnType, (v: any) => 1, true, true)}
                            </Grid>
                        </Grid>
                        <div style={{color: 'black', fontSize: '12px'}}>Parameters</div>
                        <div style={{
                            // backgroundColor: 'pink', 
                            border: '1px solid rgba(1, 1, 1, 0.5)', 
                            borderRadius: 4, 
                            padding: 5, 
                            width: '98%',
                            }}>
                            <ParamChip parameters={props.method.parameters} />
                        </div>
                        <div style={{color: 'black', fontSize: '12px', marginTop: '10px'}}>
                            Suggested equivalence classes
                        </div>
                        <div style={{
                            border: '1px solid rgba(1, 1, 1, 0.5)',
                            borderRadius: 4,
                            minHeight: '32px',
                            padding: 5,
                            width: '98%',
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '5px',
                        }}>
                            {(props.method.equivClasses || []).length > 0
                                ? (props.method.equivClasses || []).map((equivClass) => (
                                    <Chip
                                        key={equivClass.identifier}
                                        label={equivClass.name}
                                        size="small"
                                        variant="outlined"
                                        color="success"
                                    />
                                ))
                                : <span style={{color: 'rgba(1, 1, 1, 0.6)', fontSize: '12px'}}>
                                    No suggested equivalence classes
                                  </span>}
                        </div>
                    </div>
                </div>
        </div>
    )
}

function buildParamString(parameters: Parameter[]) {
    return parameters?.map((p) => parameterToString(p)).join(', ')
}
