import { INSURANCE_TYPE, STEPS } from '../../../app/constants';

export default function PolicyStepGeneral () {
      const next = async () => {
        try {
          const form = {
            insuredName: values.insuredName,
            insuredType: values.insuredType,
            lineOfBusiness: values.lineOfBusiness,
            sumInsured: Number(values.sumInsured),
            premium: Number(values.premium),
            retentionLimit: Number(values.retentionLimit),
            effectiveFrom: values.effectiveFrom,
            effectiveTo: values.effectiveTo
          };
          console.log(form)
        //   await policyService.create(payload);
        //   navigate('/policies');
        } catch (e) { console.error(e); }
      };
    return (
        <>

            <Stack spacing={2}>
                <FormTextField label="Insured Name" name="insuredName" value={values.insuredName} onChange={onChange} error={errors.insuredName} />
                <FormTextField select label="Insured Type" name="insuredType" value={values.insuredType} onChange={onChange}>
                    <MenuItem value="INDIVIDUAL">INDIVIDUAL</MenuItem>
                    <MenuItem value="CORPORATE">CORPORATE</MenuItem>
                </FormTextField>
                <FormTextField select label="Line of Business" name="lineOfBusiness" value={values.lineOfBusiness} onChange={onChange}>

                    {INSURANCE_TYPE?.map((type) => (
                        <MenuItem value={type}>{type}</MenuItem>
                    ))}

                </FormTextField>
                <FormTextField type="date" label="Effective From" name="effectiveFrom" value={values.effectiveFrom} onChange={onChange} InputLabelProps={{ shrink: true }} />
                <FormTextField type="date" label="Effective To" name="effectiveTo" value={values.effectiveTo} onChange={onChange} InputLabelProps={{ shrink: true }} />
            </Stack>
            <Stack direction="row" justifyContent="space-between">
                <Button disabled={active === 0} onClick={back} color="secondary">Back</Button>
                {active < STEPS.length - 1 ? (
                    <Button onClick={next}>Next</Button>
                ) : (
                    <Button onClick={submit}>Create Policy</Button>
                )}
            </Stack>
        </>
    )
}