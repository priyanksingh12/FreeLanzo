import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiFilter, FiStar, FiMapPin, FiBriefcase } from "react-icons/fi";
import { workersMock } from "../../mocks/workers.mock";

const WorkerDiscovery = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSkill, setFilterSkill] = useState("");

  const filteredWorkers = workersMock.filter((worker) => {
    const matchesSearch = worker.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          worker.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSkill = filterSkill ? worker.skills.includes(filterSkill) : true;
    return matchesSearch && matchesSkill;
  });

  const allSkills = Array.from(new Set(workersMock.flatMap(w => w.skills)));

  return (
    <div className="space-y-6 pb-10">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Discover Talent</h1>
        <p className="text-sm text-gray-500 mt-1">Find the perfect freelancer for your next project.</p>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#6B46C1] focus:border-transparent outline-none transition-all"
          />
        </div>
        <div className="md:w-64 relative">
          <FiFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <select
            value={filterSkill}
            onChange={(e) => setFilterSkill(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#6B46C1] focus:border-transparent outline-none transition-all appearance-none"
          >
            <option value="">All Skills</option>
            {allSkills.map(skill => (
              <option key={skill} value={skill}>{skill}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWorkers.map(worker => (
          <div key={worker.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all group flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <img src={worker.avatarUrl} alt={worker.name} className="w-16 h-16 rounded-full object-cover border-2 border-gray-50" />
              <div className="bg-yellow-50 px-2 py-1 rounded text-xs font-bold text-yellow-700 flex items-center gap-1">
                <FiStar className="fill-current" /> {worker.rating}
              </div>
            </div>
            
            <h3 className="font-bold text-gray-900 text-lg group-hover:text-[#6B46C1] transition-colors">
              <Link to={`/workers/${worker.id}`} className="focus:outline-none">
                <span className="absolute inset-0" aria-hidden="true"></span>
                {worker.name}
              </Link>
            </h3>
            <p className="text-sm font-medium text-[#6B46C1]">{worker.title}</p>
            
            <div className="mt-4 space-y-2 text-sm text-gray-600 flex-1">
              <div className="flex items-center gap-2"><FiMapPin className="text-gray-400" /> {worker.location}</div>
              <div className="flex items-center gap-2"><FiDollarSign className="text-gray-400" /> ${worker.hourlyRate}/hr</div>
              <div className="flex items-center gap-2"><FiBriefcase className="text-gray-400" /> {worker.completedJobs} jobs completed</div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-50">
              <div className="flex flex-wrap gap-1">
                {worker.skills.slice(0, 3).map(skill => (
                  <span key={skill} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                    {skill}
                  </span>
                ))}
                {worker.skills.length > 3 && (
                  <span className="px-2 py-0.5 bg-gray-50 text-gray-400 text-xs rounded">+{worker.skills.length - 3}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredWorkers.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 border-dashed">
          <p className="text-gray-500 font-medium">No workers found matching your criteria.</p>
          <button 
            onClick={() => { setSearchTerm(""); setFilterSkill(""); }}
            className="mt-2 text-[#6B46C1] hover:underline text-sm font-medium"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
};

export default WorkerDiscovery;
