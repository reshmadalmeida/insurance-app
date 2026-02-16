import { useState } from 'react';
import { Box, Button, MenuItem, Stack, Step, StepLabel, Stepper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useForm from '../../../hooks/useForm';
import FormTextField from '../../../components/common/FormTextField';
import { policyService } from '../../../services/policyService';
import { INSURANCE_TYPE, STEPS } from '../../../app/constants';
import DataTable from '../../../shared/DataTable';
import PolicyStepGeneral from './PolicyStepGeneral';
import PolicyStepReview from './PolicyStepReview';
import PolicyStepCoverage from './PolicyStepCoverage';


export default function CreatePolicyWizard() {
  const { values, errors, onChange, setError, clearErrors } = useForm({
    insuredName: '',
    insuredType: 'INDIVIDUAL',
    lineOfBusiness: 'HEALTH',
    sumInsured: 0,
    premium: 0,
    retentionLimit: 0,
    effectiveFrom: '',
    effectiveTo: ''
  });

  const [active, setActive] = useState(0);
  const navigate = useNavigate();

  const validateGeneral = () => {
    clearErrors();
    let ok = true;
    if (!values.insuredName) { setError('insuredName', 'Required'); ok = false; }
    if (!values.effectiveFrom) { setError('effectiveFrom', 'Required'); ok = false; }
    if (!values.effectiveTo) { setError('effectiveTo', 'Required'); ok = false; }
    return ok;
  };

  const validateCoverage = () => {
    clearErrors();
    let ok = true;
    if (values.sumInsured <= 0) { setError('sumInsured', 'Must be > 0'); ok = false; }
    if (values.premium < 0) { setError('premium', 'Cannot be negative'); ok = false; }
    if (values.retentionLimit < 0) { setError('retentionLimit', 'Cannot be negative'); ok = false; }
    if (values.retentionLimit > values.sumInsured) { setError('retentionLimit', 'Cannot exceed Sum Insured'); ok = false; }
    return ok;
  };

  const next = () => {
    if (active === 0 && !validateGeneral()) return;
    if (active === 1 && !validateCoverage()) return;
    setActive((s) => Math.min(s + 1, STEPS.length - 1));
  };
  const back = () => setActive((s) => Math.max(s - 1, 0));

  const submit = async () => {
    try {
      const payload = {
        insuredName: values.insuredName,
        insuredType: values.insuredType,
        lineOfBusiness: values.lineOfBusiness,
        sumInsured: Number(values.sumInsured),
        premium: Number(values.premium),
        retentionLimit: Number(values.retentionLimit),
        effectiveFrom: values.effectiveFrom,
        effectiveTo: values.effectiveTo
      };
      await policyService.create(payload);
      navigate('/policies');
    } catch (e) { console.error(e); }
  };
console.log(form,"form")
  return (
    <Stack spacing={3}>
      <Stepper activeStep={active}>
        {STEPS.map((label) => <Step key={label}><StepLabel>{label}</StepLabel></Step>)}
      </Stepper>

      {active === 0 && (
        <PolicyStepGeneral  next={form}/>
        // <Stack spacing={2}>
        //   <FormTextField label="Insured Name" name="insuredName" value={values.insuredName} onChange={onChange} error={errors.insuredName} />
        //   <FormTextField select label="Insured Type" name="insuredType" value={values.insuredType} onChange={onChange}>
        //     <MenuItem value="INDIVIDUAL">INDIVIDUAL</MenuItem>
        //     <MenuItem value="CORPORATE">CORPORATE</MenuItem>
        //   </FormTextField>
        //   <FormTextField select label="Line of Business" name="lineOfBusiness" value={values.lineOfBusiness} onChange={onChange}>
            
        //     {INSURANCE_TYPE?.map((type)=>(         
        //     <MenuItem value={type}>{type}</MenuItem>
        //     ))}
          
        //   </FormTextField>
        //   <FormTextField type="date" label="Effective From" name="effectiveFrom" value={values.effectiveFrom} onChange={onChange} InputLabelProps={{ shrink: true }} />
        //   <FormTextField type="date" label="Effective To" name="effectiveTo" value={values.effectiveTo} onChange={onChange} InputLabelProps={{ shrink: true }} />
        // </Stack>
      )}

      {active === 1 && (
        <PolicyStepCoverage/>
        // <Stack spacing={2}>
        //   <FormTextField label="Sum Insured" type="number" name="sumInsured" value={values.sumInsured} onChange={onChange} error={errors.sumInsured} />
        //   <FormTextField label="Premium"  type="number" name="premium" value={values.premium} onChange={onChange} error={errors.premium} />
        //   <FormTextField label="Retention Limit"  type="number" name="retentionLimit" value={values.retentionLimit} onChange={onChange} error={errors.retentionLimit} />
        // </Stack>
      )}

      {active === 2 && (
        // <Box>
        //   <pre style={{ background:'#f7f7f7', padding:12, borderRadius:6 }}>
        //       <DataTable values ={values}/>
          
        //   </pre>
        // </Box>
        <PolicyStepReview/>
      )}

      <Stack direction="row" justifyContent="space-between">
        <Button disabled={active === 0} onClick={back} color="secondary">Back</Button>
        {active < STEPS.length - 1 ? (
          <Button onClick={next}>Next</Button>
        ) : (
          <Button onClick={submit}>Create Policy</Button>
        )}
      </Stack>
    </Stack>
  );
}