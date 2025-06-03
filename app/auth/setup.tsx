import Box from '@/components/Box';
import AuthHeader from '@/components/auth/AuthHeader';
import AccountTypePage from '@/views/setupPages/AccountTypePage';
import InformationPage from '@/views/setupPages/InformationPage';
import InterestPage from '@/views/setupPages/InterestPage';
import { router } from 'expo-router';
import { atom, useAtomValue, useSetAtom } from 'jotai';
import React from 'react';

export const setupStageAtom = atom(1);

const Setup = () => {
    const stage = useAtomValue(setupStageAtom);
    const setStage = useSetAtom(setupStageAtom);
    const header = React.useCallback(() => {
        if (stage === 1) {
            return 'Information'
        }

        if (stage === 2) {
            return 'Set account type'
        }

        if (stage === 3) {
            return 'Select categories'
        }

        return "Information"
    }, [stage])

    const handleBackPress = React.useCallback(() => {
        if (stage > 1) {
            setStage(stage - 1);
        }

        if (stage === 1) {
            router.back();
        }
    }, [setStage, stage])
    return (
        <Box flex={1} backgroundColor='secondaryBackgroundColor'>
            <AuthHeader title={header()} customFunction={() => handleBackPress()} />
            {stage === 1 && <InformationPage />}
            {stage === 2 && <AccountTypePage />}
            {stage === 3 && <InterestPage />}
        </Box>
    )
}

export default Setup

// http://localhost:3000/#access_token=eyJhbGciOiJIUzI1NiIsImtpZCI6Ik5yd21BTlFGdHg1dzRXVHAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3Z2dHVmdWd3dGFka2VvdXhscmRoLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiJmMDFlOWU4YS1mYjhiLTRlNWQtOTliMi01ZGFlNmU3M2M3MTQiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzQ4OTUzMTI4LCJpYXQiOjE3NDg5NDk1MjgsImVtYWlsIjoiZGFuaWVsZW1tYW51ZWwyNTdAZ21haWwuY29tIiwicGhvbmUiOiIiLCJhcHBfbWV0YWRhdGEiOnsicHJvdmlkZXIiOiJlbWFpbCIsInByb3ZpZGVycyI6WyJlbWFpbCJdfSwidXNlcl9tZXRhZGF0YSI6eyJlbWFpbCI6ImRhbmllbGVtbWFudWVsMjU3QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaG9uZV92ZXJpZmllZCI6ZmFsc2UsInN1YiI6ImYwMWU5ZThhLWZiOGItNGU1ZC05OWIyLTVkYWU2ZTczYzcxNCJ9LCJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFhbCI6ImFhbDEiLCJhbXIiOlt7Im1ldGhvZCI6Im90cCIsInRpbWVzdGFtcCI6MTc0ODk0OTUyOH1dLCJzZXNzaW9uX2lkIjoiMThhNjM2MDQtMmUyZS00MzAxLWJjNjAtYTQ3YmU3ODE3NDAxIiwiaXNfYW5vbnltb3VzIjpmYWxzZX0.FN3zC3zISuuIslE-qykCMCFUklBuUCbkynD63j1peN8&expires_at=1748953128&expires_in=3600&refresh_token=pm2nl2drkndc&token_type=bearer&type=signup