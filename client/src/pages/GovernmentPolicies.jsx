import { useState, useEffect, useContext } from "react";
import { UserContext } from "../Providers/userContext";
import {
  ChevronDown,
  ChevronRight,
  Grid,
  List,
  Search,
  Calendar,
  FileText,
  MapPin,
  Building,
  Filter, // Import Filter icon
  X, // Import X (close) icon
} from "lucide-react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const GovernmentPolicies = () => {
  const { userData, isLoggedIn } = useContext(UserContext);
  const [viewMode, setViewMode] = useState("list");
  const [searchTerm, setSearchTerm] = useState("");
  const [policies, setPolicies] = useState([]);
  const [policyFilters, setPolicyFilters] = useState({
    Region: "",
    Department: "",
    Status: "",
    Year: "",
  });
  const [expandedSections, setExpandedSections] = useState({
    Regions: true,
    Departments: true,
    Status: true,
    Years: true,
  });

  // New state for mobile sidebar toggle
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const API_URL =
    import.meta.env.VITE_APP_API_URL || "http://localhost:5000/api";

  const locationObj = userData.State || "";

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await axios.get(`${API_URL}/policies`, {
          params: { location: locationObj._id },
        });
        setPolicies(response.data);
      } catch (err) {
        console.log("Error fetching policies:", err);
      }
    };

    if (location) {
      fetchPolicies();
    }
  }, [location]);

  const Regions = [
    ...new Set(policies.map((policy) => policy.Region.State_Name)),
  ];
  const Departments = [...new Set(policies.map((policy) => policy.Department))];
  const Statuses = [...new Set(policies.map((policy) => policy.Status))];
  const Years = [...new Set(policies.map((policy) => policy.Year))];

  const filteredPolicies = policies.filter((policy) => {
    const search = searchTerm.toLowerCase().trim();

    return (
      (policyFilters.Region === "" ||
        policy.Region.State_Name === policyFilters.Region) &&
      (policyFilters.Department === "" ||
        policy.Department === policyFilters.Department) &&
      (policyFilters.Status === "" || policy.Status === policyFilters.Status) &&
      (policyFilters.Year === "" || policy.Year === policyFilters.Year) &&
      (search === "" ||
        (policy.Name && policy.Name.toLowerCase().includes(search)) ||
        (policy.Description &&
          policy.Description.toLowerCase().includes(search)) ||
        (policy.Department && policy.Department.toLowerCase().includes(search)))
    );
  });

  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };

  // Clear filters
  const clearFilters = () => {
    setPolicyFilters({
      Region: "",
      Department: "",
      Status: "",
      Year: "",
    });
    setSearchTerm("");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "No deadline"; // Handle empty or undefined values

    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return "Invalid Date"; // Handle incorrect date formats
    }

    return new Intl.DateTimeFormat("en-IN", {
      Year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  // Get Status color
  const getStatusColor = (Status) => {
    switch (Status) {
      case "Active":
        return "bg-green-100 text-green-800 border-green-300";
      case "Pending Review":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "Draft":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "Expired":
        return "bg-gray-100 text-gray-800 border-gray-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  // Get active filters count
  const getActiveFilterCount = () => {
    return (
      Object.values(policyFilters).filter((value) => value !== "").length +
      (searchTerm ? 1 : 0)
    );
  };

  const handleSaving = async (policyId) => {
    try {
      const response = await axios.post(
        `${API_URL}/user/saveItems`,

        {
          userId: userData.id,
          itemId: policyId,
          itemType: "Policy",
        },
        {
          headers: {
            Authorization: `Bearer ${userData.token}`, // Include the token in the headers
          },
        }
      );
      toast.success("Saved successfully!");
      console.log("Policy saved successfully:", response.data);
    } catch (error) {
      toast.error("Something went wrong");
      console.log("Error saving policy:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f6ef]">
      <Navbar />
      {isLoggedIn && (
        <div className="flex flex-col md:flex-row w-full mx-auto relative">
          {/* Mobile Filter Toggle Button (Visible only on small screens) */}
          <div className="md:hidden p-4 bg-[#fce3cd]/50 border-b border-[#fce3cd] flex justify-between items-center sticky top-0 z-30 backdrop-blur-sm">
            <h1 className="text-xl font-bold text-amber-900">Policies</h1>
            <button
              onClick={() => setShowMobileFilters(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-amber-200 rounded-lg text-amber-900 shadow-sm text-sm font-medium active:scale-95 transition-transform"
            >
              <Filter className="w-4 h-4" />
              Filters{" "}
              {getActiveFilterCount() > 0 && `(${getActiveFilterCount()})`}
            </button>
          </div>

          {/* Mobile Overlay Backdrop */}
          {showMobileFilters && (
            <div
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setShowMobileFilters(false)}
            />
          )}

          {/* Sidebar Filters */}
          <div
            className={`
              fixed inset-y-0 left-0 z-50 w-3/4 max-w-xs bg-[#fce3cd] shadow-2xl transform transition-transform duration-300 ease-in-out overflow-y-auto
              md:translate-x-0 md:static md:w-1/4 md:shadow-none md:h-auto md:border-r md:border-t md:border-gray-500 md:bg-[#fce3cd]/70 md:sticky md:top-16 md:max-h-[calc(100vh-64px)]
              ${showMobileFilters ? "translate-x-0" : "-translate-x-full"}
            `}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-amber-900">Filters</h2>

                {/* Close Button (Mobile Only) */}
                <button
                  className="md:hidden p-1 hover:bg-amber-200 rounded-full transition-colors"
                  onClick={() => setShowMobileFilters(false)}
                >
                  <X className="w-6 h-6 text-amber-900" />
                </button>

                {/* Clear All (Desktop Only) */}
                {getActiveFilterCount() > 0 && (
                  <button
                    className="hidden md:block text-amber-800 hover:text-amber-600 text-sm font-medium"
                    onClick={clearFilters}
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Search */}
              <div className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search policies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value || "")}
                    className="w-full p-2 pl-8 border border-amber-900 rounded bg-white"
                  />
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-amber-900" />
                </div>
              </div>

              {/* Mobile Clear All Button */}
              {getActiveFilterCount() > 0 && (
                <button
                  className="md:hidden w-full text-center mb-4 py-2 text-sm bg-amber-100 text-amber-800 rounded border border-amber-200"
                  onClick={clearFilters}
                >
                  Clear All Filters
                </button>
              )}

              {/* Departments */}
              <div className="border-t border-amber-900 py-4">
                <div
                  className="flex justify-between items-center cursor-pointer mb-3"
                  onClick={() => toggleSection("Departments")}
                >
                  <h3 className="font-bold text-amber-900">Departments</h3>
                  {expandedSections.Departments ? (
                    <ChevronDown className="h-5 w-5 text-amber-700" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-amber-700" />
                  )}
                </div>
                {expandedSections.Departments && (
                  <div className="space-y-2">
                    {Departments.map((Department, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="mr-2 h-4 w-4 accent-amber-600"
                            checked={policyFilters.Department === Department}
                            onChange={() =>
                              setPolicyFilters({
                                ...policyFilters,
                                Department:
                                  policyFilters.Department === Department
                                    ? ""
                                    : Department,
                              })
                            }
                          />
                          <span className="text-amber-900">{Department}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Status */}
              <div className="border-t border-amber-900 py-4">
                <div
                  className="flex justify-between items-center cursor-pointer mb-3"
                  onClick={() => toggleSection("Status")}
                >
                  <h3 className="font-bold text-amber-900">Status</h3>
                  {expandedSections.Status ? (
                    <ChevronDown className="h-5 w-5 text-amber-700" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-amber-700" />
                  )}
                </div>
                {expandedSections.Status && (
                  <div className="space-y-2">
                    {Statuses.map((Status, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="mr-2 h-4 w-4 accent-amber-600"
                            checked={policyFilters.Status === Status}
                            onChange={() =>
                              setPolicyFilters({
                                ...policyFilters,
                                Status:
                                  policyFilters.Status === Status ? "" : Status,
                              })
                            }
                          />
                          <span className="text-amber-900">{Status}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Years */}
              <div className="border-t border-amber-900 py-4">
                <div
                  className="flex justify-between items-center cursor-pointer mb-3"
                  onClick={() => toggleSection("Years")}
                >
                  <h3 className="font-bold text-amber-900">Year Published</h3>
                  {expandedSections.Years ? (
                    <ChevronDown className="h-5 w-5 text-amber-700" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-amber-700" />
                  )}
                </div>
                {expandedSections.Years && (
                  <div className="space-y-2">
                    {Years.map((Year, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="mr-2 h-4 w-4 accent-amber-600"
                            checked={policyFilters.Year === Year}
                            onChange={() =>
                              setPolicyFilters({
                                ...policyFilters,
                                Year: policyFilters.Year === Year ? "" : Year,
                              })
                            }
                          />
                          <span className="text-amber-900">{Year}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full md:w-3/4 p-4 md:p-5 border-t border-gray-500 bg-[#f6f6ef]">
            {/* Header and Controls - Hidden on mobile as we have the top bar */}
            <div className="hidden md:flex justify-between items-center border-b border-gray-300 pb-3 mb-6">
              <div>
                <h1 className="text-2xl font-bold text-amber-900">
                  Government Policies
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-amber-800">
                  {filteredPolicies.length} results
                </span>

                <div className="flex border border-amber-200 rounded bg-white">
                  <button
                    className={`p-1 ${
                      viewMode === "list" ? "bg-amber-100" : "bg-white"
                    }`}
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-5 w-5 text-amber-700" />
                  </button>
                  <button
                    className={`p-1 ${
                      viewMode === "grid" ? "bg-amber-100" : "bg-white"
                    }`}
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="h-5 w-5 text-amber-700" />
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Results count */}
            <div className="md:hidden flex justify-between items-center mb-4 text-sm text-amber-800">
              <span>{filteredPolicies.length} results found</span>
            </div>

            {/* Content Grid */}
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6"
                  : "space-y-6"
              }
            >
              {filteredPolicies.map((policy, index) => (
                <motion.div
                  key={policy._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-[#fff8f2] rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)] transition-all duration-300 p-6 space-y-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`px-2 py-1 text-xs rounded-full font-semibold border ${getStatusColor(
                        policy.Status
                      )}`}
                    >
                      {policy.Status}
                    </span>
                    <span className="text-xs text-amber-600">
                      {policy.Year}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-xl-900">
                    {policy.Name}
                  </h2>

                  <p className="text-sm text-amber-800 line-clamp-3">
                    {policy.Description}
                  </p>

                  <div className="space-y-2 text-sm text-amber-700">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-amber-700" />
                      Region: {policy.Region?.State_Name}
                    </div>
                    <div className="flex items-center">
                      <Building className="w-4 h-4 mr-2 text-amber-700" />
                      Department: {policy.Department}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-amber-700" />
                      Deadline: {formatDate(policy.Deadline)}
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-dashed border-amber-200 mt-3">
                    <a
                      href={policy.documentLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm"
                    >
                      <FileText className="h-4 w-4 mr-1" />
                      View Document
                    </a>

                    <button
                      onClick={() => handleSaving(policy._id)}
                      className="text-sm text-amber-700 hover:text-amber-900 font-medium"
                    >
                      Save for Later
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredPolicies.length === 0 && (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 mx-auto text-amber-300 mb-4" />
                <h3 className="text-xl font-bold text-amber-900 mb-2">
                  No policies found
                </h3>
                <p className="text-amber-700">
                  Try adjusting your filters or search term
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GovernmentPolicies;
