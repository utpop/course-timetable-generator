import { useAuth } from '@/hooks'
import { EmptyLayout } from '@/layouts'
import { NextPageWithLayout, SignUpPayload } from '@/types'
import { Facebook, GitHub, Google } from '@mui/icons-material'
import {
  Alert,
  Avatar,
  Box,
  Button,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { classValidatorResolver } from '@hookform/resolvers/class-validator'
import { FirebaseErrorTag, Url } from '@/enums'

const SignUp: NextPageWithLayout = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors: filedErrors },
  } = useForm<SignUpPayload>({ resolver: classValidatorResolver(SignUpPayload) })
  const { signUp } = useAuth()
  const [systemError, setSystemError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleSignUp(payload: SignUpPayload) {
    setSystemError('')
    setLoading(true)

    signUp(payload)
      .then(() => router.push(Url.Main))
      .catch((err) => {
        if (err.code === FirebaseErrorTag.EmailExists) {
          setError('email', { message: 'Email is taken' })
        } else {
          setSystemError('Something went wrong :D Try again')
        }
      })
      .finally(() => setLoading(false))
  }

  return (
    <Paper
      elevation={3}
      sx={{
        display: 'flex',
        width: {
          xs: 360,
          md: 748,
        },
        p: 5,
      }}
    >
      <Box flexGrow={1}>
        <Stack alignItems="start">
          <Avatar
            alt="ctg-logo"
            src="https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png"
            variant="square"
            sx={{ width: 28, height: 28 }}
          />

          <Typography
            variant="h5"
            component="h2"
            sx={{
              pt: 2,
            }}
          >
            Create your system account
          </Typography>
        </Stack>

        <Stack spacing={4} sx={{ pt: 4 }} component="form" onSubmit={handleSubmit(handleSignUp)}>
          <TextField
            label="Email"
            type="email"
            size="small"
            required
            placeholder="tpo@gmail.com"
            error={Boolean(filedErrors.email)}
            helperText={filedErrors.email?.message}
            sx={{ fontSize: 14 }}
            {...register('email')}
          />

          <TextField
            label="Password"
            type="password"
            size="small"
            required
            error={Boolean(filedErrors.password)}
            helperText={filedErrors.password?.message}
            sx={{ fontSize: 14 }}
            {...register('password', { minLength: 6 })}
          />

          <TextField
            label="Password Confirm"
            type="password"
            size="small"
            required
            error={Boolean(filedErrors.passwordConfirm)}
            helperText={filedErrors.passwordConfirm?.message}
            sx={{ fontSize: 14 }}
            {...register('passwordConfirm')}
          />

          {systemError !== '' && <Alert severity="error">{systemError}</Alert>}

          <Stack direction="row" justifyContent="space-between">
            <Button tabIndex={-1} sx={{ textTransform: 'none' }}>
              <Link href={Url.SignIn}>
                <span>Sign in instead</span>
              </Link>
            </Button>

            <Button
              variant="contained"
              type="submit"
              disabled={loading}
              sx={{ textTransform: 'none' }}
            >
              Let&apos;s go
            </Button>
          </Stack>
        </Stack>

        <Divider sx={{ my: 2 }}>Or</Divider>

        <Stack direction="row" justifyContent="space-around">
          <Button variant="outlined">
            <Google />
          </Button>

          <Button variant="outlined">
            <Facebook />
          </Button>

          <Button variant="outlined">
            <GitHub />
          </Button>
        </Stack>
      </Box>

      <Stack sx={{ pl: 6, justifyContent: 'center' }}>
        <Avatar
          alt="ctg-sign-up"
          src="https://ssl.gstatic.com/accounts/signup/glif/account.svg"
          variant="square"
          sx={{ width: 224, height: 224 }}
        />
      </Stack>
    </Paper>
  )
}

SignUp.Layout = EmptyLayout

export default SignUp
