
import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import moment from 'moment';

import Spin from 'src/components/spin';

import { Line } from '@ant-design/charts';
import { Select, DatePicker, Form } from 'antd';

import Card from '../../components/Card';

import { useSetState } from '../../hooks/useSetState';

import "./styles.less";

const { RangePicker } = DatePicker;

const Covid = Main => {
  const [loading, setLoading] = useState(false);
  const [listNation, setListNation] = useState([]);
  const [searchText, setSearchText] = useState('');

  const [form] = Form.useForm();

  const [{ from, to }] = useSetState({
    from: null,
    to: null,
  })

  let [{ totalCase, totalDeaths, totalRecover, countries, constCountry, dataChart }, setState] = useSetState({
    totalCase: 0,
    totalDeaths: 0,
    totalRecover: 0,
    countries: [],
    constCountry: [],
    dataChart: []
  })
  const getWorldTotal = () => {
    axios.get('https://api.covid19api.com/world/total').then(({ data }) => {
      const { TotalRecovered, TotalConfirmed, TotalDeaths } = data;
      setState({
        totalCase: TotalConfirmed,
        totalDeaths: TotalDeaths,
        totalRecover: TotalRecovered
      })
    })
  }

  const getListCountries = () => {
    axios.get('https://api.covid19api.com/countries').then(({ data }) => {
      setState({
        countries: data,
        constCountry: data,
      })
    })
  }

  const getDataChart = ({ slug, from, to, status = 'confirmed' }) => {

    axios.get(`https://api.covid19api.com/dayone/country/${slug}/status/${status}?from=${from}&to=${to}`).then(({ data }) => {
      setState({
        dataChart: data
      })
    })
  }

  const handleSearchSelect = (textSearch) => {
    (textSearch) => {
      let temp = [...countries];
      temp = temp.filter(el => {
        return el.Slug.toLowerCase().includes(textSearch.toLowerCase()) || el.Country.toLowerCase().includes(textSearch.toLowerCase());
      })
      if (textSearch) {
        setState({
          countries: temp
        })
      } else {
        setState({
          countries: constCountry
        })
      }
    }
  }

  const handleChangeValuesForm = (valueChange, allValues) => {
    const { country, date, status } = allValues;
    if (date && date !== "null" && country) {
      const from = date[0];
      const to = date[1];
      getDataChart({ slug: country, from: moment(from).format('YYYY-MM-DD') + "T00:00:00.000Z", to: moment(to).format('YYYY-MM-DD') + "T00:00:00.000Z", status })
    }
  }

  useEffect(() => {
    getWorldTotal();
    getListCountries();
  }, [])

  const config = {
    data: dataChart,
    height: 400,
    xField: 'Date',
    yField: 'Cases',
    point: {
      size: 5,
      shape: 'diamond',
    },
  };

  return <div className="main">
    <div className=' p-4 border'>
      <div className=' mx-2'></div>
      <div className='flex flex-row '>
        <Card title="Total confirmed" body={totalCase} bgColor='bg-[#2563eb]' />
        <Card title="Total deaths" body={totalDeaths} bgColor='bg-[#dc2626]' />
        <Card title="Total recovered" body={totalRecover} bgColor='bg-[#65a30d]' />
      </div>
    </div>

    <div className=' p-4 border mt-8'>
      <div className="text-16px my-6 mx-2" >
        <div className='mb-8 text-24px font-bold text-red-600'>Select field to display chart</div>
        <Form form={form} onValuesChange={handleChangeValuesForm}>
          <Form.Item label="From - To" name="date">
            <RangePicker
              disabledDate={(current) => {
                let customeDate = moment().format("YYYY-MM-DD");
                return current && current > moment(customeDate, "YYYY-MM-DD")
              }}
              name="date" />
          </Form.Item>
          <Form.Item label="Country" name="country">
            <Select
              name="country"
              showSearch
              onSearch={handleSearchSelect}
              style={{
                width: '100%',
              }}
              placeholder="Select the country"
            >
              {
                countries.map(el => {
                  return <Option key={el?.Slug}>{el?.Country}</Option>
                })
              }
            </Select>
          </Form.Item>
          <Form.Item label="Status" name="status">
            <Select
              style={{
                width: '100%',
              }}
              placeholder="Select the status"
            >
              {
                ['confirmed', 'recovered', 'deaths'].map(el => {
                  return <Option key={el}>{el}</Option>
                })
              }
            </Select>
          </Form.Item>
        </Form>
      </div>
      {
        dataChart?.length > 0 && <Line {...config} />
      }
    </div>
  </div>
}

export default Covid