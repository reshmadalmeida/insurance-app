import React from "react";
import { useNavigate } from 'react-router-dom';
import useForm from '../../../hooks/useForm';

export default function PolicyStepCoverage({ form}) {
    const { values, errors, onChange, setError, clearErrors } = useForm({
        membersCount: 0,
        regNumber: null,
        age: null,
        propertyType: 'Residential',

    });
    const [active, setActive] = useState(0);
    const navigate = useNavigate();

    const validateGeneral = () => {
        clearErrors();
        let ok = true;
        if (!values.membersCount) { setError('membersCount', 'Required'); ok = false; }
        if (!values.regNumber) { setError('regNumber', 'Required'); ok = false; }
        if (!values.age) { setError('age', 'Required'); ok = false; }
        if (!values.propertyType) { setError('propertyType', 'Required'); ok = false; }
        return ok;
    };
    //   const validateCoverage = () => {
    //     clearErrors();
    //     let ok = true;
    //     if (values.sumInsured <= 0) { setError('sumInsured', 'Must be > 0'); ok = false; }
    //     if (values.premium < 0) { setError('premium', 'Cannot be negative'); ok = false; }
    //     if (values.retentionLimit < 0) { setError('retentionLimit', 'Cannot be negative'); ok = false; }
    //     if (values.retentionLimit > values.sumInsured) { setError('retentionLimit', 'Cannot exceed Sum Insured'); ok = false; }
    //     return ok;
    //   };
    const next = () => {
        if (active === 0 && !validateGeneral()) return;
        // if (active === 1 && !validateCoverage()) return;
        setActive((s) => Math.min(s + 1, STEPS.length - 1));
    };
    const back = () => setActive((s) => Math.max(s - 1, 0));
    return (
        <div>
            <h2>Coverage Details</h2>

            {form.policyType === "Health" && (

                <FormTextField label="Members Count" type="number" name="membersCount" value={values.membersCount} onChange={onChange} error={errors.membersCount} />

            )}

            {form.policyType === "Motor" && (

                <FormTextField label="Registration Number" type="number" name="regNumber" value={values.regNumber} onChange={onChange} error={errors.regNumber} />


            )}

            {form.policyType === "Life" && (
                <FormTextField label="Age" type="number" name="age" value={values.age} onChange={onChange} error={errors.age} />

            )}

            {form.policyType === "Property" && (

                <FormTextField select label="Property Type" name="propertyType" value={values.propertyType} onChange={onChange}>
                    <MenuItem value="Residential">Residential</MenuItem>
                    <MenuItem value="Commercial">Commercial</MenuItem>
                    <MenuItem value="Industrial">Industrial</MenuItem>
                </FormTextField>

            )}

            <Stack direction="row" justifyContent="space-between">
                <Button disabled={active === 0} onClick={back} color="secondary">Back</Button>
                {active < STEPS.length - 1 ? (
                    <Button onClick={next}>Next</Button>
                ) : (
                    <Button onClick={submit}>Create Policy</Button>
                )}
            </Stack>
        </div>
    );
}