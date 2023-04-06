import { Button, Heading, MultiStep, Text, TextInput } from '@ignite-ui/react'
import { ArrowRight } from 'phosphor-react'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Container, Form, FormError, Header } from './styles'
import { useRouter } from 'next/router'
import { api } from '@/lib/axios'
import { AxiosError } from 'axios'

export default function Register() {
  const registerFormnSchema = z.object({
    username: z
      .string()
      .min(3, { message: 'Mínino de 3 letas.' })
      .regex(/^([a-z\\\\-]+)$/i, { message: 'Apenas letras e hífens.' })
      .transform((username) => username.toLowerCase()),
    name: z.string().min(3, { message: 'Mínino de 3 letas.' }),
  })

  type RegisterFormData = z.infer<typeof registerFormnSchema>

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormnSchema),
  })

  const router = useRouter()

  useEffect(() => {
    if (router.query.username) {
      setValue('username', String(router.query.username))
    }
  }, [router.query?.username, setValue])

  const handleRegister = async (data: RegisterFormData) => {
    try {
      await api.post('/users', {
        name: data.name,
        username: data.username,
      })

      await router.push('/register/connect-calendar')
    } catch (error) {
      if (error instanceof AxiosError && error?.response?.data?.message) {
        alert(error.response.data.message)
        return
      }
      console.log(
        '🚀 ~ file: index.page.tsx:48 ~ handleRegister ~ error:',
        error,
      )
    }
  }

  return (
    <Container>
      <Header>
        <Heading as="strong">Bem-vindo ao Ignite Call!</Heading>
        <Text>
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </Text>
        <MultiStep size={4} currentStep={1} />
      </Header>
      <Form as="form" onSubmit={handleSubmit(handleRegister)}>
        <label>
          <Text size="sm">Nome de usuário</Text>
          <TextInput
            prefix="ignite.com/"
            placeholder="seu-usuario"
            {...register('username')}
          />
          {errors.username && (
            <FormError size="sm">{errors.username.message}</FormError>
          )}
        </label>

        <label>
          <Text size="sm">Nome completo</Text>
          <TextInput placeholder="Seu nome" {...register('name')} />
          {errors.name && (
            <FormError size="sm">{errors.name.message}</FormError>
          )}
        </label>

        <Button type="submit" disabled={isSubmitting}>
          Próximo passo
          <ArrowRight />
        </Button>
      </Form>
    </Container>
  )
}
