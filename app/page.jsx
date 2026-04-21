import React, { useState } from 'react';
import { Download, Plus, Trash2, Edit2, Settings } from 'lucide-react';

export default function ScrapeFlowIntelligent() {
  const [lang, setLang] = useState('fr');
  const [service, setService] = useState('restaurants');
  const [rawData, setRawData] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [generateDesc, setGenerateDesc] = useState(false);

  const serviceConfigs = {
    restaurants: {
      columns: ['name', 'address', 'phone', 'website', 'rating'],
      optionalColumns: ['description', 'email'],
      description: '🍽️ Restaurants'
    },
    products: {
      columns: ['name', 'price', 'stock', 'rating', 'description'],
      optionalColumns: ['website', 'email'],
      description: '📦 Produits'
    },
    websites: {
      columns: ['name', 'website', 'traffic', 'authority', 'contact'],
      optionalColumns: ['description', 'email'],
      description: '🌐 Sites Web'
    }
  };

  const translations = {
    fr: {
      title: '⚡ ScrapeFlow Assistant',
      subtitle: 'Dashboard intelligent pour votre service',
      selectService: 'Sélectionnez votre service',
      inputLabel: 'Collez vos données (n\'importe quel ordre)',
      placeholder: 'Nom: Maria Belza\nTéléphone: +33 1 86\nAdresse: 90 Quai...\nSite web: example.com\nRating: 4.5',
      reformat: 'Reformater les données',
      generate: 'Générer descriptions',
      addDescription: 'Ajouter descriptions (optionnel)',
      exportExcel: 'Télécharger Excel',
      exportCsv: 'Télécharger CSV',
      edit: 'Éditer',
      delete: 'Supprimer',
      save: 'Enregistrer',
      cancel: 'Annuler',
      name: 'Nom',
      address: 'Adresse',
      phone: 'Téléphone',
      email: 'Email',
      website: 'Site Web',
      price: 'Prix',
      stock: 'Stock',
      description: 'Description',
      rating: 'Rating',
      traffic: 'Trafic',
      authority: 'Domain Authority',
      contact: 'Contact',
      noData: 'Aucune donnée',
      items: 'éléments',
      error: 'Erreur',
      success: 'Succès!',
      loading: 'Chargement...',
      columns: 'Colonnes affichées'
    },
    en: {
      title: '⚡ ScrapeFlow Assistant',
      subtitle: 'Smart dashboard for your service',
      selectService: 'Select your service',
      inputLabel: 'Paste your data (any order)',
      placeholder: 'Name: Maria Belza\nPhone: +33 1 86\nAddress: 90 Quai...\nWebsite: example.com\nRating: 4.5',
      reformat: 'Reformat data',
      generate: 'Generate descriptions',
      addDescription: 'Add descriptions (optional)',
      exportExcel: 'Download Excel',
      exportCsv: 'Download CSV',
      edit: 'Edit',
      delete: 'Delete',
      save: 'Save',
      cancel: 'Cancel',
      name: 'Name',
      address: 'Address',
      phone: 'Phone',
      email: 'Email',
      website: 'Website',
      price: 'Price',
      stock: 'Stock',
      description: 'Description',
      rating: 'Rating',
      traffic: 'Traffic',
      authority: 'Domain Authority',
      contact: 'Contact',
      noData: 'No data',
      items: 'items',
      error: 'Error',
      success: 'Success!',
      loading: 'Loading...',
      columns: 'Columns displayed'
    },
    es: {
      title: '⚡ ScrapeFlow Assistant',
      subtitle: 'Panel inteligente para tu servicio',
      selectService: 'Selecciona tu servicio',
      inputLabel: 'Pega tus datos (en cualquier orden)',
      placeholder: 'Nombre: Maria Belza\nTeléfono: +33 1 86\nDirección: 90 Quai...\nSitio web: example.com\nCalificación: 4.5',
      reformat: 'Reformatear datos',
      generate: 'Generar descripciones',
      addDescription: 'Agregar descripciones (opcional)',
      exportExcel: 'Descargar Excel',
      exportCsv: 'Descargar CSV',
      edit: 'Editar',
      delete: 'Eliminar',
      save: 'Guardar',
      cancel: 'Cancelar',
      name: 'Nombre',
      address: 'Dirección',
      phone: 'Teléfono',
      email: 'Correo',
      website: 'Sitio Web',
      price: 'Precio',
      stock: 'Stock',
      description: 'Descripción',
      rating: 'Calificación',
      traffic: 'Tráfico',
      authority: 'Autoridad del Dominio',
      contact: 'Contacto',
      noData: 'Sin datos',
      items: 'elementos',
      error: 'Error',
      success: '¡Éxito!',
      loading: 'Cargando...',
      columns: 'Columnas mostradas'
    }
  };

  const t = translations[lang];
  const config = serviceConfigs[service];

  const getDisplayColumns = () => {
    let cols = [...config.columns];
    if (generateDesc && !cols.includes('description')) {
      cols.push('description');
    }
    return cols;
  };

  const columnLabels = {
    name: t.name,
    address: t.address,
    phone: t.phone,
    email: t.email,
    website: t.website,
    price: t.price,
    stock: t.stock,
    description: t.description,
    rating: t.rating,
    traffic: t.traffic,
    authority: t.authority,
    contact: t.contact
  };

  const reformatData = () => {
    const lines = rawData.split('\n').filter(l => l.trim());
    const newItems = [];
    let currentItem = {};

    lines.forEach(line => {
      const lower = line.toLowerCase();
      const value = line.split(':')[1]?.trim() || '';

      if (lower.includes('nom') || lower.includes('name') || lower.includes('nombre')) {
        currentItem.name = value;
      } else if (lower.includes('adresse') || lower.includes('address') || lower.includes('dirección')) {
        currentItem.address = value;
      } else if (lower.includes('téléphone') || lower.includes('phone') || lower.includes('teléfono')) {
        currentItem.phone = value;
      } else if (lower.includes('email') || lower.includes('correo')) {
        currentItem.email = value;
      } else if (lower.includes('site') || lower.includes('website') || lower.includes('web') || lower.includes('url')) {
        currentItem.website = value;
      } else if (lower.includes('prix') || lower.includes('price') || lower.includes('precio')) {
        currentItem.price = value;
      } else if (lower.includes('stock')) {
        currentItem.stock = value || 'En stock';
      } else if (lower.includes('rating') || lower.includes('note') || lower.includes('calificación')) {
        currentItem.rating = value;
      } else if (lower.includes('trafic') || lower.includes('traffic')) {
        currentItem.traffic = value;
      } else if (lower.includes('authority') || lower.includes('autorité') || lower.includes('da')) {
        currentItem.authority = value;
      } else if (lower.includes('contact')) {
        currentItem.contact = value;
      } else if (Object.keys(currentItem).length > 0 && line.trim()) {
        currentItem.description = line;
      }
    });

    if (Object.keys(currentItem).length > 0) {
      newItems.push({
        id: Date.now() + Math.random(),
        ...currentItem,
        description: currentItem.description || ''
      });
    }

    setItems(newItems);
    setRawData('');
  };

  const generateDescriptions = () => {
    setLoading(true);
    setTimeout(() => {
      const updatedItems = items.map(item => {
        let desc = '';
        if (service === 'restaurants') {
          desc = `${item.name || 'Restaurant'} - Service professionnel avec ambiance agréable. ${item.rating ? 'Note: ' + item.rating : ''}`;
        } else if (service === 'products') {
          desc = `${item.name || 'Produit'} de qualité premium à ${item.price || 'prix compétitif'}. ${item.stock ? 'Stock: ' + item.stock : ''}`;
        } else if (service === 'websites') {
          desc = `${item.name || 'Site'} avec forte présence en ligne. Trafic: ${item.traffic || 'important'}`;
        }
        return { ...item, description: desc };
      });
      setItems(updatedItems);
      setLoading(false);
    }, 1000);
  };

  const exportData = (format) => {
    const displayCols = getDisplayColumns();
    const header = displayCols.map(col => columnLabels[col]).join(',');
    
    let csv = header + '\n';
    items.forEach(item => {
      const row = displayCols.map(col => {
        const val = item[col] || '';
        return `"${val}"`;
      }).join(',');
      csv += row + '\n';
    });

    const blob = new Blob([csv], { type: format === 'csv' ? 'text/csv' : 'application/vnd.ms-excel' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `scrapeflow_${Date.now()}.${format}`;
    a.click();
  };

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setEditData(item);
  };

  const saveEdit = () => {
    setItems(items.map(item => item.id === editingId ? editData : item));
    setEditingId(null);
  };

  return (
    <div style={{ background: '#0a0f1a', color: '#e2e8f0', fontFamily: 'system-ui', minHeight: '100vh', padding: '20px' }}>
      {/* Language & Service Selection */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          {['fr', 'en', 'es'].map(l => (
            <button
              key={l}
              onClick={() => setLang(l)}
              style={{
                padding: '8px 16px',
                background: lang === l ? '#7b61ff' : '#1a2035',
                border: 'none',
                color: '#fff',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '12px'
              }}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          {Object.entries(serviceConfigs).map(([key, cfg]) => (
            <button
              key={key}
              onClick={() => setService(key)}
              style={{
                padding: '10px 16px',
                background: service === key ? '#00b4d8' : '#1a2035',
                border: '1px solid ' + (service === key ? '#00b4d8' : '#1a2035'),
                color: '#fff',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '13px'
              }}
            >
              {cfg.description}
            </button>
          ))}
        </div>
      </div>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>{t.title}</h1>
        <p style={{ color: '#888', fontSize: '16px' }}>{t.subtitle}</p>
        <p style={{ color: '#666', fontSize: '13px', marginTop: '10px' }}>
          {t.columns}: {getDisplayColumns().map(c => columnLabels[c]).join(' • ')}
        </p>
      </div>

      {/* Input Section */}
      <div style={{ maxWidth: '900px', margin: '0 auto', marginBottom: '30px' }}>
        <label style={{ display: 'block', fontSize: '14px', color: '#888', marginBottom: '10px', fontWeight: '600' }}>
          {t.inputLabel}
        </label>
        <textarea
          value={rawData}
          onChange={(e) => setRawData(e.target.value)}
          placeholder={t.placeholder}
          style={{
            width: '100%',
            height: '180px',
            padding: '15px',
            background: '#070c15',
            border: '1px solid #1a2035',
            borderRadius: '8px',
            color: '#fff',
            fontSize: '14px',
            fontFamily: 'system-ui',
            resize: 'vertical'
          }}
        />

        {/* Checkboxes */}
        <div style={{ marginTop: '15px', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#e2e8f0' }}>
            <input
              type="checkbox"
              checked={generateDesc}
              onChange={(e) => setGenerateDesc(e.target.checked)}
              style={{ cursor: 'pointer', width: '16px', height: '16px' }}
            />
            <span style={{ fontSize: '14px' }}>{t.addDescription}</span>
          </label>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '15px', flexWrap: 'wrap' }}>
          <button
            onClick={reformatData}
            style={{
              padding: '12px 24px',
              background: '#7b61ff',
              border: 'none',
              color: '#fff',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '14px'
            }}
          >
            {t.reformat}
          </button>
          {generateDesc && items.length > 0 && (
            <button
              onClick={generateDescriptions}
              disabled={loading}
              style={{
                padding: '12px 24px',
                background: loading ? '#1a2035' : '#00b4d8',
                border: 'none',
                color: '#fff',
                borderRadius: '6px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontWeight: '600',
                fontSize: '14px'
              }}
            >
              {loading ? t.loading : t.generate}
            </button>
          )}
        </div>
      </div>

      {/* Items Display */}
      {items.length > 0 && (
        <div style={{ maxWidth: '1200px', margin: '0 auto', marginBottom: '30px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '15px' }}>
            {items.length} {t.items}
          </h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #1a2035' }}>
                  {getDisplayColumns().map(col => (
                    <th
                      key={col}
                      style={{
                        padding: '12px',
                        textAlign: 'left',
                        color: '#888',
                        fontSize: '12px',
                        fontWeight: '600',
                        background: '#070c15'
                      }}
                    >
                      {columnLabels[col]}
                    </th>
                  ))}
                  <th style={{ padding: '12px', textAlign: 'left', color: '#888', fontSize: '12px', fontWeight: '600', background: '#070c15' }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} style={{ borderBottom: '1px solid #1a2035' }}>
                    {getDisplayColumns().map(col => (
                      <td
                        key={col}
                        style={{
                          padding: '12px',
                          fontSize: '13px',
                          color: '#cbd5e0',
                          maxWidth: '200px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {item[col] || '—'}
                      </td>
                    ))}
                    <td style={{ padding: '12px' }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => startEdit(item)}
                          style={{
                            padding: '6px 10px',
                            background: '#1a2035',
                            border: 'none',
                            color: '#00b4d8',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <Edit2 size={12} />
                        </button>
                        <button
                          onClick={() => deleteItem(item.id)}
                          style={{
                            padding: '6px 10px',
                            background: '#1a2035',
                            border: 'none',
                            color: '#ff6b6b',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Export Buttons */}
      {items.length > 0 && (
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => exportData('xlsx')}
            style={{
              padding: '14px 28px',
              background: '#7b61ff',
              border: 'none',
              color: '#fff',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px'
            }}
          >
            <Download size={18} /> {t.exportExcel}
          </button>
          <button
            onClick={() => exportData('csv')}
            style={{
              padding: '14px 28px',
              background: '#00b4d8',
              border: 'none',
              color: '#fff',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px'
            }}
          >
            <Download size={18} /> {t.exportCsv}
          </button>
        </div>
      )}
    </div>
  );
}

