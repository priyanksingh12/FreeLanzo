import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaArrowRight, FaSpinner, FaMapMarkerAlt } from 'react-icons/fa';
import { Country, State, City } from 'country-state-city';
import axiosClient from '../../api/axiosClient';
import { setUserData } from '../../features/user/userSlice';
import { ROUTES } from '../../routes/paths';

const LocationSelection = () => {
  const { role } = useSelector((state) => state.user);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      setStates(State.getStatesOfCountry(selectedCountry));
      setSelectedState('');
      setCities([]);
      setSelectedCity('');
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState && selectedCountry) {
      setCities(City.getCitiesOfState(selectedCountry, selectedState));
      setSelectedCity('');
    }
  }, [selectedState, selectedCountry]);

  const handleContinue = async () => {
    if (!selectedCountry || !selectedState || !selectedCity) return;
    setLoading(true);
    setError('');

    const countryName = Country.getCountryByCode(selectedCountry)?.name || '';
    const stateName = State.getStateByCodeAndCountry(selectedState, selectedCountry)?.name || '';
    const cityName = selectedCity; // city is already name

    try {
      const { data } = await axiosClient.patch('/onboarding/location', {
        country: countryName,
        state: stateName,
        city: cityName
      });
      dispatch(setUserData(data.data.user));
      if (role === 'worker') {
        navigate(ROUTES.ONBOARDING_SKILLS);
      } else {
        navigate(ROUTES.ONBOARDING_PROFILE);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update location');
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = selectedCountry && selectedState && selectedCity;

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto h-full text-center">
      <div className="bg-white/10 p-4 rounded-full mb-6">
        <FaMapMarkerAlt className="text-4xl text-purple-400" />
      </div>
      <h2 className="text-4xl md:text-5xl font-bold mb-4">Where are you located?</h2>
      <p className="text-lg text-white/70 mb-12">
        This helps us match you with relevant local opportunities and clients.
      </p>

      <div className="w-full bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 mb-8 space-y-6 text-left">
        {/* Country */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-white/80">Country</label>
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="w-full bg-[#1A1A2E] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
          >
            <option value="">Select Country</option>
            {countries.map(c => (
              <option key={c.isoCode} value={c.isoCode}>{c.name}</option>
            ))}
          </select>
        </div>

        {/* State */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-white/80">State / Province</label>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            disabled={!selectedCountry}
            className="w-full bg-[#1A1A2E] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors disabled:opacity-50"
          >
            <option value="">Select State</option>
            {states.map(s => (
              <option key={s.isoCode} value={s.isoCode}>{s.name}</option>
            ))}
          </select>
        </div>

        {/* City */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-white/80">City</label>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            disabled={!selectedState}
            className="w-full bg-[#1A1A2E] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors disabled:opacity-50"
          >
            <option value="">Select City</option>
            {cities.map(c => (
              <option key={c.name} value={c.name}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {error && <p className="text-red-400 mb-6">{error}</p>}

      <button
        onClick={handleContinue}
        disabled={!isFormValid || loading}
        className={`flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
          isFormValid && !loading
            ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] text-white'
            : 'bg-white/10 text-white/30 cursor-not-allowed'
        }`}
      >
        {loading ? <FaSpinner className="animate-spin" /> : 'Continue'}
        {!loading && <FaArrowRight />}
      </button>
    </div>
  );
};

export default LocationSelection;
