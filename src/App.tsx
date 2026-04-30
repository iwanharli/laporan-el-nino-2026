import { Routes, Route } from 'react-router';
import Layout from '@/components/Layout';
import ErrorBoundary from '@/components/ErrorBoundary';
import DashboardPage from '@/pages/DashboardPage';
import MapPage from '@/pages/MapPage';
import SimulatorPage from '@/pages/SimulatorPage';
import CommoditiesPage from '@/pages/CommoditiesPage';
import KarhutlaPage from '@/pages/KarhutlaPage';
import EconomyPage from '@/pages/EconomyPage';
import DataPage from '@/pages/DataPage';

function App() {
  return (
    <ErrorBoundary>
      <Layout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/peta" element={<MapPage />} />
          <Route path="/simulator" element={<SimulatorPage />} />
          <Route path="/komoditas" element={<CommoditiesPage />} />
          <Route path="/karhutla" element={<KarhutlaPage />} />
          <Route path="/ekonomi" element={<EconomyPage />} />
          <Route path="/data" element={<DataPage />} />
        </Routes>
      </Layout>
    </ErrorBoundary>
  );
}

export default App;