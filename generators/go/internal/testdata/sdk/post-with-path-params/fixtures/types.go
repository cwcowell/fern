// This file was auto-generated by Fern from our API Definition.

package api

import (
	json "encoding/json"
	fmt "fmt"
	core "github.com/fern-api/fern-go/internal/testdata/sdk/post-with-path-params/fixtures/core"
)

type Bar struct {
	Id string `json:"id" url:"id"`

	extraProperties map[string]interface{}
	_rawJSON        json.RawMessage
}

func (b *Bar) GetExtraProperties() map[string]interface{} {
	return b.extraProperties
}

func (b *Bar) UnmarshalJSON(data []byte) error {
	type unmarshaler Bar
	var value unmarshaler
	if err := json.Unmarshal(data, &value); err != nil {
		return err
	}
	*b = Bar(value)

	extraProperties, err := core.ExtractExtraProperties(data, *b)
	if err != nil {
		return err
	}
	b.extraProperties = extraProperties

	b._rawJSON = json.RawMessage(data)
	return nil
}

func (b *Bar) String() string {
	if len(b._rawJSON) > 0 {
		if value, err := core.StringifyJSON(b._rawJSON); err == nil {
			return value
		}
	}
	if value, err := core.StringifyJSON(b); err == nil {
		return value
	}
	return fmt.Sprintf("%#v", b)
}

type Foo struct {
	Id string `json:"id" url:"id"`

	extraProperties map[string]interface{}
	_rawJSON        json.RawMessage
}

func (f *Foo) GetExtraProperties() map[string]interface{} {
	return f.extraProperties
}

func (f *Foo) UnmarshalJSON(data []byte) error {
	type unmarshaler Foo
	var value unmarshaler
	if err := json.Unmarshal(data, &value); err != nil {
		return err
	}
	*f = Foo(value)

	extraProperties, err := core.ExtractExtraProperties(data, *f)
	if err != nil {
		return err
	}
	f.extraProperties = extraProperties

	f._rawJSON = json.RawMessage(data)
	return nil
}

func (f *Foo) String() string {
	if len(f._rawJSON) > 0 {
		if value, err := core.StringifyJSON(f._rawJSON); err == nil {
			return value
		}
	}
	if value, err := core.StringifyJSON(f); err == nil {
		return value
	}
	return fmt.Sprintf("%#v", f)
}
