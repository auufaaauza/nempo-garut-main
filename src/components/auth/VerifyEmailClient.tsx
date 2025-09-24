'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface Props {
  params: { id: string; hash: string }
  searchParams: { [key: string]: string }
}

const VerifyEmailClient = ({ params, searchParams }: Props) => {
  const router = useRouter()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const { id, hash } = params
    console.log('🪪 PARAMS:', params)
    console.log('🔍 SEARCH PARAMS:', searchParams)

    if (!id || !hash) {
      console.error('❌ Parameter ID atau HASH tidak ada:', { id, hash })
      setStatus('error')
      setMessage('Parameter tidak lengkap.')
      return
    }

    const verifyEmail = async () => {
      try {
        const query = new URLSearchParams(searchParams).toString()
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/email/verify/${id}/${hash}?${query}`

        console.log('🔗 Verifying URL:', apiUrl)

        const res = await fetch(apiUrl)
        console.log('📥 Response:', res)

        if (res.redirected) {
          console.log('🔀 Redirected to:', res.url)
          window.location.href = res.url
          return
        }

        if (res.ok) {
          console.log('✅ Verifikasi sukses!')
          setStatus('success')
          router.push('/profile?verified=true')
        } else {
          const data = await res.json()
          console.error('❌ Verifikasi gagal:', data)
          setStatus('error')
          setMessage(data.message || 'Link verifikasi tidak valid.')
        }
      } catch (err) {
        console.error('🚨 Gagal fetch/verifikasi:', err)
        setStatus('error')
        setMessage('Terjadi kesalahan saat verifikasi.')
      }
    }

    verifyEmail()
  }, [params, searchParams, router])


  return (
    <div className="flex items-center justify-center min-h-screen px-4 text-center">
      {status === 'loading' && <p className="text-blue-600">🔄 Memverifikasi email kamu...</p>}
      {status === 'success' && <p className="text-green-600">✅ Verifikasi berhasil! Mengarahkan ke profil...</p>}
      {status === 'error' && <p className="text-red-600">❌ {message}</p>}
    </div>
  )
}

export default VerifyEmailClient
