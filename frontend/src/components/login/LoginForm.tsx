"use client";
import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Formik, Form } from 'formik';
import Link from 'next/link'; // ✅ Import Link from Next.js
import useLoginForm from '../../hooks/login/useLoginForm';
import { useTheme } from '@mui/material/styles';
import CustomField from '../common/Field';

const LoginForm: React.FC = () => {
    const { initialValues, showPassword, setShowPassword, validationSchema, handleSubmit } = useLoginForm();
    const theme = useTheme();
    const [result, setResult] = useState<{ success: boolean; message?: string } | null>(null);

    const onSubmit = async (values: { email: string; password: string }) => {
        const result = await handleSubmit(values);
        setResult(result);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                height: '100%',
                padding: { xs: 2, md: 0 },
            }}
        >
            {/* Responsive Typography */}
            <Typography
                color={theme.palette.text.disabled}
                textAlign="center"
                variant="h4"
                component="h1"
                gutterBottom
                sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' } }} // Responsive font size
            >
                Login
            </Typography>

            <Typography
                variant="body1"
                textAlign="center"
                gutterBottom
                sx={{ fontSize: { xs: '0.7rem', sm: '0.90rem', md: '1rem' } }} // Responsive font size
            >
                Welcome back! Please log in to your account.
            </Typography>

            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {({ isSubmitting }) => (
                    <Form>
                        <CustomField name="email" label="Email" type="text" />
                        <CustomField name="password" label="Password" type="password" showPassword={showPassword} setShowPassword={setShowPassword} />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            disabled={isSubmitting}
                            sx={{ mt: 3, mb: 2, bgcolor: theme.palette.text.disabled }}
                        >
                            Login
                        </Button>
                    </Form>
                )}
            </Formik>

            {/* "Don't have an account? Sign up" */}
            <Typography textAlign="center" sx={{ fontSize: { xs: '0.7rem', sm: '0.9rem', md: '1rem' }, mt: 2 }} >
                Don’t have an account?{" "}
                <Link href="/signup" style={{ color: theme.palette.primary.main, textDecoration: 'none', fontWeight: 'bold' }}>
                    Sign up
                </Link>
            </Typography>
        </Box>
    );
};

export default LoginForm;
