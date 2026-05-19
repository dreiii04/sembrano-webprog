import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import logo from '../../assets/images/logo.jpg';
import { createUser } from '../../services/UserService';

const roles = ['admin', 'editor', 'viewer'];
const genders = ['male', 'female', 'other'];

const inputClasses =
  'mt-2 w-full rounded-xl border border-zinc-300 bg-zinc-100 px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-zinc-50';

const actionButtonClassName = 'w-full rounded-xl py-3 text-[11px] tracking-[0.2em]';
const errorTextClassName = 'mt-2 text-xs text-red-600';

const labelize = (value) => {
  return value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : '';
};

const SignUpPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    contactNumber: '',
    email: '',
    role: 'viewer',
    username: '',
    password: '',
    address: '',
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const nextErrors = {};
    const email = form.email.trim().toLowerCase();
    const username = form.username.trim().toLowerCase();
    const age = form.age.trim();
    const contactNumber = form.contactNumber.trim();
    const password = String(form.password ?? '');

    [
      ['firstName', 'First name'],
      ['lastName', 'Last name'],
      ['age', 'Age'],
      ['gender', 'Gender'],
      ['contactNumber', 'Contact number'],
      ['email', 'Email'],
      ['role', 'Role'],
      ['username', 'Username'],
      ['password', 'Password'],
      ['address', 'Address'],
    ].forEach(([key, label]) => {
      if (!String(form[key]).trim()) {
        nextErrors[key] = `${label} is required.`;
      }
    });

    if (!nextErrors.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = 'Enter a valid email address.';
    }

    if (!nextErrors.age && !/^\d+$/.test(age)) {
      nextErrors.age = 'Age must be a number.';
    }

    if (!nextErrors.contactNumber && !/^\d{11}$/.test(contactNumber)) {
      nextErrors.contactNumber = 'Contact number must be 11 digits.';
    }

    if (!nextErrors.username && /\s/.test(username)) {
      nextErrors.username = 'Username must not contain spaces.';
    }

    if (!nextErrors.password && password.length < 8) {
      nextErrors.password = 'Password must be at least 8 characters.';
    }

    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError('');
    const nextErrors = validate();

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Match the server schema (role maps to the API's type field).
      await createUser({
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        age: form.age.trim(),
        gender: form.gender.trim().toLowerCase(),
        contactNumber: form.contactNumber.trim(),
        email: form.email.trim().toLowerCase(),
        type: form.role.trim().toLowerCase(),
        username: form.username.trim().toLowerCase(),
        password: form.password,
        address: form.address.trim(),
        isActive: true,
      });

      navigate('/auth/signin');
    } catch (error) {
      const message = error.response?.data?.message || 'Unable to create an account.';

      if (/email_1/i.test(message)) {
        setErrors((prev) => ({ ...prev, email: 'Email address already exists.' }));
      }

      if (/username_1/i.test(message)) {
        setErrors((prev) => ({ ...prev, username: 'Username already exists.' }));
      }

      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="mb-2 flex items-center gap-3">
        <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-zinc-900">
          <img src={logo} alt="Cat Cafe logo" className="h-full w-full object-cover" />
        </div>
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500">Create Account</p>
      </div>

      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">Sign Up</h1>
      <p className="mt-3 text-sm leading-6 text-zinc-600">
        Create your account to access the dashboard and manage content.
      </p>
        <div className="mt-4">
          <Button to="/" variant="secondary">Home</Button>
        </div>

      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        {submitError ? (
          <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-xs text-red-700">
            {submitError}
          </p>
        ) : null}
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="first-name" className="text-sm font-medium text-zinc-700">
              First Name
            </label>
            <input
              id="first-name"
              name="firstName"
              type="text"
              autoComplete="given-name"
              value={form.firstName}
              onChange={handleChange}
              className={inputClasses}
              required
            />
            {errors.firstName ? <p className={errorTextClassName}>{errors.firstName}</p> : null}
          </div>

          <div>
            <label htmlFor="last-name" className="text-sm font-medium text-zinc-700">
              Last Name
            </label>
            <input
              id="last-name"
              name="lastName"
              type="text"
              autoComplete="family-name"
              value={form.lastName}
              onChange={handleChange}
              className={inputClasses}
              required
            />
            {errors.lastName ? <p className={errorTextClassName}>{errors.lastName}</p> : null}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="signup-age" className="text-sm font-medium text-zinc-700">
              Age
            </label>
            <input
              id="signup-age"
              name="age"
              type="text"
              value={form.age}
              onChange={handleChange}
              className={inputClasses}
              required
            />
            {errors.age ? <p className={errorTextClassName}>{errors.age}</p> : null}
          </div>
          <div>
            <label htmlFor="signup-gender" className="text-sm font-medium text-zinc-700">
              Gender
            </label>
            <select
              id="signup-gender"
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className={inputClasses}
              required
            >
              <option value="">Select gender</option>
              {genders.map((gender) => (
                <option key={gender} value={gender}>
                  {labelize(gender)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="signup-contact" className="text-sm font-medium text-zinc-700">
            Contact Number
          </label>
          <input
            id="signup-contact"
            name="contactNumber"
            type="text"
            placeholder="Placeholder"
            value={form.contactNumber}
            onChange={handleChange}
            className={inputClasses}
            required
          />
          {errors.contactNumber ? <p className={errorTextClassName}>{errors.contactNumber}</p> : null}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="signup-email" className="text-sm font-medium text-zinc-700">
              Email
            </label>
            <input
              id="signup-email"
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              className={inputClasses}
              required
            />
            {errors.email ? <p className={errorTextClassName}>{errors.email}</p> : null}
          </div>
          <div>
            <label htmlFor="signup-role" className="text-sm font-medium text-zinc-700">
              Role
            </label>
            <select
              id="signup-role"
              name="role"
              value={form.role}
              onChange={handleChange}
              className={inputClasses}
              required
            >
              {roles.map((role) => (
                <option key={role} value={role}>
                  {labelize(role)}
                </option>
              ))}
            </select>
            {errors.role ? <p className={errorTextClassName}>{errors.role}</p> : null}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="signup-username" className="text-sm font-medium text-zinc-700">
              Username
            </label>
            <input
              id="signup-username"
              name="username"
              type="text"
              value={form.username}
              onChange={handleChange}
              className={inputClasses}
              required
            />
            {errors.username ? <p className={errorTextClassName}>{errors.username}</p> : null}
          </div>
          <div>
            <label htmlFor="signup-password" className="text-sm font-medium text-zinc-700">
              Password
            </label>
            <input
              id="signup-password"
              name="password"
              type="password"
              autoComplete="new-password"
              value={form.password}
              onChange={handleChange}
              className={inputClasses}
              required
            />
            {errors.password ? <p className={errorTextClassName}>{errors.password}</p> : null}
            <p className="mt-2 text-xs leading-5 text-zinc-500">
              Use a secure password with letters, numbers, and symbols.
            </p>
          </div>
        </div>

        <div>
          <label htmlFor="signup-address" className="text-sm font-medium text-zinc-700">
            Address
          </label>
          <textarea
            id="signup-address"
            name="address"
            value={form.address}
            onChange={handleChange}
            className={`${inputClasses} min-h-30`}
            required
          />
          {errors.address ? <p className={errorTextClassName}>{errors.address}</p> : null}
        </div>

        <Button type="submit" variant="primary" className={actionButtonClassName}>
          {isSubmitting ? 'Creating Account...' : 'Create Account'}
        </Button>

        <div className="grid gap-3 pt-2 sm:grid-cols-2">
          <Button type="button" variant="secondary" className={actionButtonClassName}>
            Sign up with Google
          </Button>
          <Button type="button" variant="secondary" className={actionButtonClassName}>
            Sign up with Apple
          </Button>
        </div>
      </form>

      <div className="mt-8 border-t border-zinc-200 pt-6 text-sm text-zinc-600">
        Already have an account?{' '}
        <Link to="/auth/signin" className="font-semibold text-zinc-900 transition hover:text-zinc-600">
          Log In
        </Link>
      </div>
    </>
  );
};

export default SignUpPage;
