import React from "react";
import { useNavigate } from 'react-router-dom';
import useForm from '../../../hooks/useForm';
import { STEPS } from "../../../app/constants";
export default function PolicyStepReview({ form }) {
   const [active, setActive] = useState(0);
   const navigate = useNavigate();
  const submit =  () => {
    try {
    //   const payload = {
    //     insuredName: values.insuredName,
    //     insuredType: values.insuredType,
    //     lineOfBusiness: values.lineOfBusiness,
    //     sumInsured: Number(values.sumInsured),
    //     premium: Number(values.premium),
    //     retentionLimit: Number(values.retentionLimit),
    //     effectiveFrom: values.effectiveFrom,
    //     effectiveTo: values.effectiveTo
    //   };
    console.log(payload)
    //   await policyService.create(payload);
      navigate('/policies');
    } catch (e) { console.error(e); }
  };

  const next = () => {
   
    setActive((s) => Math.min(s + 1, STEPS.length - 1));
    submit();
  };
    const back = () => setActive((s) => Math.max(s - 1, 0));

    return (
    //make use of Datatable
    <div>
      <h2>Review & Submit</h2>

      {/* <pre>{JSON.stringify(form, null, 2)}</pre> */}
 <Box>
          <pre style={{ background:'#f7f7f7', padding:12, borderRadius:6 }}>
              <DataTable values ={form}/>
          
          </pre>
        </Box>         <Stack direction="row" justifyContent="space-between">
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