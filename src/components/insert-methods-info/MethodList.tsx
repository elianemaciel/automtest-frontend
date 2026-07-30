import { Stack, Text3 } from "@telefonica/mistica";
import { Method } from "../../models/Method";
import MethodDetails from "./MethodDetails";
import { ContentType } from "./ContentType";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import ValidationErrorSnackbar from "../ValidationErrorComponent";

export default function MethodList(props: {
        methods: Method[], 
        removeMethod: (methodId: string) => void, 
        updateView: (newContent: ContentType, method?: Method) => void,
        showEquivClassesList: any,
    }) {

    const empty_methods = "Generated methods will appear here. You can also add a method manually before continuing:";
    const non_empty_methods = "Review the generated methods below. You can edit, remove, or add methods before continuing:";

    const [methods, setMethods] = useState<Method[]>([])
    const [showValidationError, setShowValidationError] = useState(false);
    const [validationErrorMsg, setValidationErrorMsg] = useState('');


    useEffect(() => {
        if (props.methods) {
            console.log('MethodList.methods.useEffect', props.methods)
            setMethods(props.methods)
        }
    }, [props.methods])

    function onRemove(methodId: string) {
        setMethods(methods => methods.filter(m => m.identifier != methodId))
        props.removeMethod(methodId)
    }

    function onSubmit() {
        const method = methods.find(m => 
                                !m.className 
                                || !m.name 
                                || !m.returnType 
                                || !m.parameters 
                                || m.parameters.length == 0
                                || m.parameters.find(p => !p.name || !p.type))
        if (methods.length == 0) {
            setShowValidationError(true);
            setValidationErrorMsg('Please provide at least one method')
        } else if (method) {
            setShowValidationError(true);
            setValidationErrorMsg('Please provide all the required fields for "' + method.name + '"')
        } else {
            props.showEquivClassesList();
        }
    }

    return (
        <div>
            <ValidationErrorSnackbar open={showValidationError} message={validationErrorMsg} changeOpenState={() => setShowValidationError(!showValidationError)} />
            <Stack space={12}>
                <Text3 regular color="black">{methods.length == 0 ? empty_methods : non_empty_methods}</Text3>
                <div style={{
                    height: '460px',
                    overflowY: 'auto',
                    // backgroundColor: 'red'
                }}>
                    {
                        methods?.map((method: Method) => <MethodDetails 
                                                                    method={method}
                                                                    onRemove={onRemove}
                                                                    onEdit={() => props.updateView(ContentType.NEW_METHOD, method)} />
                                        )
                    }
                    <Button 
                        variant="outlined" 
                        color="success" 
                        disableElevation 
                        style={{
                            width: '94%',
                            margin: '16px',
                            marginLeft: '17px',
                            marginTop: '0px'
                        }}
                        onClick={() => props.updateView(ContentType.NEW_METHOD)}>
                            Add a new method
                    </Button>
                </div>

                <BottomButtons onSubmit={onSubmit} />
            </Stack>
        </div>
    )
}

function BottomButtons(props: {onSubmit: any}) {
    return <div style={{
        marginInlineStart: '24px',
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    }}>
        <Button 
            variant="outlined" 
            color="secondary" 
            disableElevation 
            style={{
                width: '100px',
                marginTop: '8px',
                height: '55px'
            }}
            onClick={() => 1}>
                Go back
        </Button>
        <Button 
            variant="outlined" 
            color="primary" 
            disableElevation 
            style={{
                marginLeft: '16px',
                marginRight: '24px',
                height: '55px'
            }}
            onClick={props.onSubmit}>
                Continue With Selected Methods
        </Button>
        
    </div>;
}
