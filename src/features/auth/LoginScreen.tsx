import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from "../../app/store";
import { userLogin } from './authActions'
import Error from '../../components/Error'
import { RootState } from "../../app/store";
import { Spinner } from "../../components/Spinner";

const LoginScreen = () => {
  const { loading, error } = useSelector((state: RootState) => state.auth)
  const dispatch: AppDispatch = useDispatch();
  const { register, handleSubmit } = useForm()

  const submitForm = (data: any) => {
    dispatch(userLogin(data))
  }

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      {error && <Error>{error}</Error>}
      <div className='form-group'>
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          className='form-input'
          {...register('email')}
          required
        />
      </div>
      <div className='form-group'>
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          className='form-input'
          {...register('password')}
          required
        />
      </div>
      <button type='submit' className='button' disabled={loading}>
        {loading ? <Spinner /> : 'Login'}
      </button>
    </form>
  )
}
export default LoginScreen