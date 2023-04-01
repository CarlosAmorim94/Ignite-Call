import { Button, Text, TextInput } from '@ignite-ui/react'
import { ArrowRight } from 'phosphor-react'
import React, { memo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form, FormAnnotation } from './styles'

const claimUsernameforSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Mínino de 3 letas.' })
    .regex(/^([a-z\\\\-]+)$/i, { message: 'Apenas letras e hífens.' })
    .transform((username) => username.toLowerCase()),
})

type ClaimUsernameFormData = z.infer<typeof claimUsernameforSchema>

export const ClaimUsernameFormComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClaimUsernameFormData>({
    resolver: zodResolver(claimUsernameforSchema),
  })

  const handleClaimUsername = (data: ClaimUsernameFormData) => {
    console.log(data.username)
  }

  return (
    <>
      <Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>
        <TextInput
          size="sm"
          prefix="ignite.com/"
          placeholder="seu-usuário"
          {...register('username')}
        />
        <Button size="sm" type="submit">
          Reservar usuário
          <ArrowRight />
        </Button>
      </Form>
      <FormAnnotation>
        <Text size="sm">
          {errors.username
            ? errors.username.message
            : 'Digite o nome do usuário desejado'}
        </Text>
      </FormAnnotation>
    </>
  )
}

export const ClaimUsernameForm = memo(ClaimUsernameFormComponent)
